const ContactUs = require("../models/ContactModel");
const connection = require("../utils/connection");
const nodemailer = require("nodemailer");
const Errorhandler = require("../utils/ErrorHandler");

const StoreContact = async (req, res, next) => {
  try {
    await connection();
    const newcontact = new ContactUs({
      fullName: req.body.fullName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      industry: req.body.industry,
      howDidYouGetToKnowUs: req.body.howDidYouGetToKnowUs,
      queryRelatedTo: req.body.queryRelatedTo,
      query: req.body.query,
    });

    if (!newcontact) {
      return next(new Errorhandler("Something went wrong", 400));
    }

    const emailBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Details</title>
    <style>
        body {
            font-family: 'Lato', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            width: 600px;
            background: red;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          
            color: black;
            text-align: center;
            padding: 20px;
            font-size: 20px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .content {
            padding: 20px;
            color: #333;
            font-size: 18px ;
            line-height: 1.8;
            border:3px solid black ;
        }
        .content p {
            margin: 10px 0;
        }
        .content strong {
            color: black;
        }
       
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Contact Form Details
        </div>
        <div class="content">
            <p><strong>Full Name:</strong> ${newcontact.fullName}</p>
            <p><strong>Email:</strong> ${newcontact.email}</p>
            <p><strong>Contact Number:</strong> ${newcontact.contactNumber}</p>
            <p><strong>Industry:</strong> ${newcontact.industry}</p>
            <p><strong>How did you get to know us:</strong> ${newcontact.howDidYouGetToKnowUs}</p>
            <p><strong>Query related to:</strong> ${newcontact.queryRelatedTo}</p>
            <p><strong>Query:</strong> ${newcontact.query}</p>
        </div>
       
    </div>
</body>
</html>
        `;
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.DEV_EMAIL,
        pass: process.env.DEV_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: process.env.DEV_EMAIL,
      to: "aditi.upadhyay@blacksof.com",
      subject: "New Contact Form Submission",
      html: emailBody,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await newcontact.save();

    return res.status(201).json({
      status: "success",
      data: newcontact,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const AllContact = async (req, res, next) => {
  try {
    await connection();

    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Page and limit must be greater than 0",
      });
    }

    const skip = (page - 1) * limit;

    const contacts = await ContactUs.find().skip(skip).limit(limit);

    const total = await ContactUs.countDocuments();


    return res.status(200).json({
      status: "success",
      data: contacts,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
    
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

const DeleteContact = async (req, res, next) => {
  try {
    let { id } = req.params;
    const deletedData = await ContactUs.findByIdAndDelete(id);
    if (!deletedData) {
      return next(new Errorhandler("Something went wrong", 400));
    }
    return res.status(200).json({
      status: "success",
      data: deletedData,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

const AllContactDelete = async(req,res,next)=>{
  try
  {
      const allcontact = await ContactUs.deleteMany();
      if(!allcontact){
          return next(new Errorhandler("Something went wrong",400));
      }
      else
      {
        return res.status(200).json({status:"success",message:"All contacts deleted successfully"});
      }
  }
  catch(error){
    return res.status(400).json({status:"fail",message:error.message});
  }
}

module.exports = {
  StoreContact,
  AllContact,
  DeleteContact,
  AllContactDelete
};
