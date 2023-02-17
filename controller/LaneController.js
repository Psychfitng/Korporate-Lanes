const Lane = require('../models/Lane');

const Organization = require('../models/Organization');

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

  exports.createLane = async (req, res) => {

    const org = await Organization.findById(req.body.companyId);
    if(org){
      const lane = new Lane({ 
        name: req.body.name,
        logo: org.organization_logo,
        companyId: org.id,
        chat: []
       });

       try{
        lane.save(lane).
          then(data => {
            res.status(201).json({ success: true, message: data})
          })
       }
       catch(err){
  
        res.status(400).json({ message: err.message });
  
       }
    }

  }

  exports.updateLane = (req, res) => {

  }

  exports.login = (req, res) => {

  }