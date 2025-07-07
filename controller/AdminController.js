const User = require("../models/AdminModel");
const Login = require("../models/LoginModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const nodemailer = require("nodemailer");

//Admin Register Route
const Registration = async (req, res, next) => {
  try {
    const { fullName, email, role, password } = req.body;

    if (!fullName || !email || !password || !role) {
      return res
        .status(404)
        .json({ status: "fail", error: "All fields are required" });
    } else {
      const userExist = await User.findOne({ email });

      if (userExist) {
        return next(new ErrorHandler("User already exist", 400));
      }

      const superAdminExist = await User.findOne({ role: "super admin" });

      if (role === "super admin" && superAdminExist) {
        return next(
          new ErrorHandler("Only one Super Admin can be created", 400)
        );
      } else {
        const gensalt = await bcryptjs.genSalt(10);
        const hasedpassword = await bcryptjs.hash(password, gensalt);
        const newUser = new User({
          fullName,
          email,
          role,
          password: hasedpassword,
        });

        await newUser.save();

        return res.status(200).json({
          status: "success",
          data: "Registration Successfully",
          newUser,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

//show All admins

const AllAdmin = async (req, res, next) => {
  try {
    const alladmindata = await User.find();
    if (!alladmindata) {
      return next(new ErrorHandler("Something went wrong", 400));
    }
    return res.status(200).json({ status: "success", alladmindata });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};


const EditAllAdmin = async(req,res,next)=>{
  try
  {
      let {id} = req.params;

      const{fullName,email} = req.body;

      const updatedData = {};
      if (fullName) updatedData.fullName = fullName;
      if (email) updatedData.email = email;

      const editeddata = await User.findByIdAndUpdate(id, updatedData, {
              new: true,
      });

      if (!editeddata) {
          return next(new ErrorHandler("Something went wrong", 400));
        }
    
        await editeddata.save();

        return res.status(200).json({
          status: "success",
          data: editeddata,
        });
  }
  catch(error){
    return res.status(404).json({ status: "fail", error: error.message });
  }
}

const DeleteAllAdmin = async (req, res, next) => {
  try {
    let { id } = req.params;
    const deletedadmin = await User.findByIdAndDelete(id);
    if (!deletedadmin) {
      return next(new ErrorHandler("Something went wrong", 400));
    }
    return res
      .status(200)
      .json({ message: "Admin Deleted successfully", deletedadmin });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", error: "Email  cannot be empty" });
    }

    const newuser = await User.findOne({ email }).select("+password");

    if (!newuser) {
      return res
        .status(404)
        .json({ status: "fail", error: "Please register yourself" });
    }

    const verifiedPassword = await bcryptjs.compare(password, newuser.password);

    if (!verifiedPassword) {
      return res
        .status(400)
        .json({ status: "fail", error: "Invalid credentials" });
    }

    const loginuser = await User.findOne({ email });

    console.log(loginuser)

    const token = jwt.sign({ email: newuser.email }, process.env.AUTH_SECRET, {
      expiresIn: "3d",
    });

    const loginUserData = {
      ...loginuser.toObject(),
      token,
    };

    res.cookie("authorization", `Bearer ${token}`, {
      expiresIn: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Login success",
      data: loginUserData,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

const AddNewAdmin = async (req, res, next) => {
  try {
    let { fullName, email, role, password } = req.body;
    if (!fullName || !email || !password || !role) {
      return res
        .status(400)
        .json({ status: "fail", error: "All fields are required" });
    } else {
      const newadmin = await User.findOne({ email });
      if (newadmin) {
        return next(new ErrorHandler("Admin already exist", 400));
      } else {
        const newadminuser = new User({
          fullName,
          email,
          role,
          password: await bcryptjs.hash(password, 10),
        });
        await newadminuser.save();
        return res
          .status(200)
          .json({ status: "success", message: "Admin created successfully" });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const LogoutUser = async (req, res) => {
  res.clearCookie("authorization", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res
    .status(200)
    .json({ status: "success", message: "Logout successfully" });
};

const ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const newuser = await User.findOne({ email });

    if (!newuser) {
      return next(new ErrorHandler("User not found", 400));
    } else {
      const secret = process.env.AUTH_SECRET;

      const token = jwt.sign(
        { email: newuser.email, userId: newuser._id },
        secret,
        {
          expiresIn: "1h",
        }
      );

      newuser.resetToken = token;
      newuser.resetTokenExpires = Date.now() + 3600000;
      await newuser.save();

      // console.log(newuser.resetToken)
      // console.log(newuser.resetTokenExpires)
      const link = `http://localhost:3000/api/admin/verify-password/${token}`;
      const emailBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; text-align: center;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1A8482; padding: 20px; text-align: center; color: white; font-size: 19px; font-weight: bold;">
                            Password Reset Request
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 20px; text-align: left; font-size: 16px; color: #333;">
                            <p style="margin-bottom: 15px; font-size:13px">Dear <strong>${newuser.fullName}</strong>,</p>
                            <p style="margin-bottom: 15px;font-size:13px">We received a request to reset your password. If you made this request, please click the button below to proceed.For security reasons, this link will expire in <strong> 1 hours.</strong></p>
                            <p style="text-align: center; margin: 20px 0;">
                                <a href="${link}" style="display: inline-block; padding: 12px 20px;font-weight: 500; font-size: 14px; color:white; background-color:#1A8482; text-decoration: none; border-radius: 5px;">
                                    Reset Password
                                </a>
                            </p>
                            <p style="margin-bottom: 15px;font-size:15px">If you did not request a password reset, or if you have already reset your password, you can safely ignore this email.</p>
                            <!-- <p style="margin-top: 20px;">Best regards,</p> -->
                            <p style="margin-top: 5px; font-weight:500; font-size:12px"> © 2025 The Buddha Institute All rights reserved.</p>                                              
                        </td>
                    </tr>    
                </table>
            </td>
        </tr>
    </table>

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
        subject: "Reset Password Link",
        html: emailBody,
      };

      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
          return res
            .status(500)
            .json({ status: "fail", error: "Failed to send email" });
        } else {
          // console.log("Email sent: " + info.response);
          return res.status(200).json({
            status: "success",
            message: "Password reset link sent",
            link,
          });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};




const VerifyPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || user.resetToken !== token || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ status: "fail", error: "Invalid or expired token" });
    }

    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    console.log(user.resetToken)
    console.log(user.resetTokenExpires)
    const redirectUrl = `http://localhost:3001/create-password/${token}`;
    return res.redirect(redirectUrl);

  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

const setpassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ status: "fail", error: "User not found" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "password and new passwords should  be  same",
      });
    }

    const genSalt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(confirmPassword, genSalt);
    user.password = hashedNewPassword;

    await user.save();

    return res
      .status(201)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({ status: "fail", error: "User not found" });
    }

    const verifiedPassword = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (currentPassword === newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "new and confirm passwords cannot be the same",
      });
    }

    const genSalt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, genSalt);
    user.password = hashedNewPassword;
    await user.save();

    return res
      .status(201)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = {
  Registration,
  LoginUser,
  LogoutUser,
  AllAdmin,
  EditAllAdmin,
  DeleteAllAdmin,
  AddNewAdmin,
  ForgotPassword,
  VerifyPassword,
  setpassword,
  ResetPassword,
};
