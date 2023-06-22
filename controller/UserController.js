const Organization = require("../models/Organization");

const LaneUser = require("../models/LaneUser");

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

// const io = require("../socket").getIO;

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, "IRPkorporate", {
    expiresIn: maxAge,
  });
};

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL, // generated ethereal user
    pass: process.env.USER_EMAIL_PWD, // generated ethereal password
  },
});

//add employee
exports.createUser = async (req, res) => {
  const org = await Organization.findById(req.body.companyId);
  if (org) {
    const password = Math.random().toString(36).substring(2, 9);
    const userName = org.user_name + Math.floor(Math.random() * 10000);

    const user = new LaneUser({
      email: req.body.employeeEmail,
      password: password,
      name: userName,
      company_name: org.name,
      role: req.body.role,
    });

    try {
      user.save(user).then((data) => {
        org.staff_list.push(data.email);
        org.save();
        res.status(201).json({ success: true, message: data });
      });
      var mailOptions = {
        from: "info@irespond.africa",
        to: req.body.employeeEmail,
        subject: "Welcome onboard",
        text: `Your journey towards wellness starts here pls find your login detail username: ${userName} and your password ${password}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (err) {
      res.status(400).json({ success: false, message: handleErrors(err) });
    }
  }
};

//Lane login
exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await LaneUser.login(name, password);
    const token = createToken(user._id, user.role);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, message: user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ success: false, message: errors });
  }
};

exports.getEmployeeByEmail = (req, res) => {

  const email = req.query.employeeEmail;
  if(email){
    LaneUser.findOne({ email }).then(data => {
      res.status(200).json({ success: true, message: {email: data.email, role: data.role} });
    }).catch(err => {
      res.status(err.status).json({ success: false, message: err.message })
    })
  }else{
    throw new Error('parameter can not be empty')
  }
};

exports.changeEmployeeRole = async(req, res) => {

  const filter = { email: req.body.employeeEmail };
  const update = { role: req.body.role };

  try {

    if(!filter || !update){
      throw new Error('Email/role cannot be empty');
    }
    const employee = await LaneUser.findOneAndUpdate(filter, update, {
      new: true
    });
    res.status(200).json({ success: true, message: employee });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message});
  }
  
};

exports.changeEmployeeUsername = async(req, res) => {

  const password = Math.random().toString(36).substring(2, 9);
  

  try {

    const id = req.query.id;
    if(!id){
      throw new Error('User does not exist');
    }
    let employee = await LaneUser.findById(id);

    const name = employee.company_name;

    const org = await Organization.findOne({ name });
    
    employee.name = org.user_name + Math.floor(Math.random() * 10000);

    await employee.save();


    var mailOptions = {
      from: "info@irespond.africa",
      to: req.body.employeeEmail,
      subject: "Username Change Request",
      text: `Your request for new username is approved. Please find your new username: ${employee.name}. "\n" NB: Your username is your unique identifier and it is only known by you except you expose it `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ success: true, message: employee });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message});
  }  
}

exports.changePassword = async(req, res) => {

  const id = req.body.id;
  const password = req.body.password;

  try {

    if(!filter || !update){
      throw new Error('Email/password cannot be empty');
    }
    let employee = await LaneUser.findById(id);

    employee.password = password;

    await employee.save();

    res.status(200).json({ success: true, message: employee });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message});
  }
  
};