
const Organization = require('../models/Organization');

const employee = require('../models/LaneUser');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@irespond.africa", // generated ethereal user
      pass: "Insidelife@1", // generated ethereal password
    },
  });

  //error handler

  const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
   
      Object.values(err.errors).forEach(({ properties }) => {
      
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  // create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'IRPkorporate', {
    expiresIn: maxAge
  });
};
  


exports.createOrganization = (req, res) => {
    
    const org = new Organization({ 
        name: req.body.name,
        user_name: req.body.user_name,
        organization_logo: req.body.organization_logo,
        email: req.body.email,
        password: req.body.password,
        subscriptionPackage: req.body.subscriptionPackage,
     });

    try{
        org.save(org).
            then(data => {
                res.status(201).json({success: true, data});
            });

        var mailOptions = {
            from: 'info@irespond.africa',
            to: req.body.email,
            subject: 'Welcome to Haven in Distress',
            text: 'We are glad to have you join the few that priotize their Employee Wellness. Please follow along as you are about to experience 500% ROI with improve employee productivity and turnover. This are your detail to continue to have a personalized experience '
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
    }
    catch(err){
        res.status(400).json({success: false, message: err.message});
    }
};

//update
exports.updateOrganization = (req, res) => {
   try{
      if(req.body && req.query.id){
        Organization.findByIdAndUpdate(req.query.id, req.body, { useFindAndModify: false, new: true }).
        then(data =>{
          res.status(200).json({ success: true, message: "Organization updated successfully", data: data })
        })
      }else{
        res.status(404).send({
          message: `Cannot delete Organization with id=${id}. Organization not found!`});
      }
   }
   catch(err){
      res.status(400).json({success: false, message: err.message})
   }
};

//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await Organization.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({success: true, message: user});
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({success: false, message: errors });
  }
}

// delete organization

exports.deleteOrganization = (req, res) => {
  
  try{

    const id = req.query.id;
    Organization.findByIdAndRemove(id).
      then(data => {
        if(!data) {
          res.status(404).send({
            message: `Cannot delete Organization with id=${id}. Organization not found!`
          });
        } else {
          res.status(200).send({
            message: "Organization was deleted successfully!"
          });
        }

      })
  }
  catch(err) {
    res.status(500).send({
      message: "Could not delete Organization with id=" + id
    });
  }
  
};

//remove organization employee

exports.removeEmployee = async (req, res) => {
  try{
    const id = req.body.organizationId;
   const organization = await Organization.findOne({ id });

   const email = req.body.employeeEmail;

   organization.staff_list.splice(organization.staff_list.indexOf(email), 1);
   await organization.save();
  
   
  //  const Employee = await employee.find({ email });

  //  console.log(Employee);

   await employee.findOneAndRemove({ email });

   res.status(200).json(`${email} is removed successfully`);

  }
  catch(err){
    res.status(400).json(err.message);
  }
}


// get organization by id

exports.getOrganization = async (req, res) => {

  try{
    const data = await Organization.findById(req.query.id);
    res.status(200).json({ success: true, message: data });
  }
  catch(err){
    res.status(400).json({ success: false, message: err.message })
  }
};

//get Organization by name
exports.getOrganizationByName = async (req, res) => {

  try{
    const name = req.query.name;
    const data = await Organization.findOne({ name });
    if(data){
      res.status(200).json({ success: true, message: data });
    }else{
      res.status(404).json('Name not found');
    }
   
  }
  catch(err){
    res.status(400).json({ success: false, message: err.message })
  }
};


//get all organizations
exports.getAllOrganization = (req, res) => {
  try{
    Organization.find().
    then(data => {
      res.status(200).json(data);
    })
  }
  catch(err){
    res.status(400).json(err.message);
  }
};

//get all employees from an organization

exports.getAllEmployesss = async (req, res) => {
  try{
    const data = await Organization.findById(req.query.id);
    res.status(200).json({message: data.staff_list});
  }
  catch(err){
    res.status(400).json(err.message);
  }
}

exports.resetPassword = async (req, res) => {
  try{
    const data = await Organization.findById(req.body.id);
    data.password = req.body.new_password;
    data.save(data);
    res.status(200).json(data);
  }
  catch(err){
    res.status(400).json(err.message);
  }
}