const express = require("express");
const router = express.Router();
const {
  Registration,
  LogoutUser,
  AllAdmin,
  LoginUser,
  EditAllAdmin,
  DeleteAllAdmin,
  AddNewAdmin,
  ForgotPassword,
  ResetPassword,
 setpassword,
 VerifyPassword,
} = require("../controller/AdminController");
const { checkRole } = require("../middleware/RoleAuthentication");
const { authenticationToken } = require("../middleware/Authentication");

router.post("/register", Registration); // done
router.get("/all-admin", AllAdmin); //done

router.patch("/edit-admin/:id",authenticationToken,checkRole("super admin"),EditAllAdmin); //done

router.delete(
  "/delete-admin/:id",
  authenticationToken,
  checkRole("super admin"),
  DeleteAllAdmin
); //done

router.post(
  "/add-admin",
  authenticationToken,
  checkRole("super admin"),
  AddNewAdmin
); //done

router.post("/login", LoginUser); //done
router.get("/logout", LogoutUser); //done

router.post("/forgot-password", ForgotPassword);
router.get("/verify-password/:token",VerifyPassword);

router.post("/set-password/:token", setpassword);

router.post("/reset-password/:id", ResetPassword); //done

module.exports = router;
