const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const User = require("../models/AdminModel");
const ErrorHandler = require("../utils/ErrorHandler");


async function authenticationToken(req, res, next) {

  try {

    const authHeader = req.headers.authorization;

    console.log("Auth Header: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "fail", error: "Not Authenticated" });
    }

    const token = authHeader.split(" ")[1];

    console.log(token);
   

    const decode = await promisify(jwt.verify)(token, process.env.AUTH_SECRET);

   

    const currentUser = await User.findOne({ email: decode.email });

    if (!currentUser) {
      return next(new ErrorHandler("Not found",404));
    }
    req.user = currentUser;

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

module.exports = {
  authenticationToken,
};
