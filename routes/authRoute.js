import express from "express";
import {
  forgotPasswordController,
  getAllAdminController,
  getAllUserController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//****** REGISTER *******/
router.post("/register", registerController);

//****** LOGIN *******/
router.post("/login", loginController);

//****** LOGIN *******/
router.post("/forgot-password", forgotPasswordController);


// //****** Get All User *******/
// router.get("/get-allusers", requireSignIn, isAdmin, getAllUserController);

//****** Get All User *******/
router.get("/get-allusers", getAllUserController);

//****** Get All User *******/
router.get("/get-alladmin", getAllAdminController);

//****** Get All User *******/
router.put("/updated/:id", updateProfileController);



//user routes
router.get('/user-auth', requireSignIn, (req, res)=>{
  res.status(200).send({ok: true});
})

//Admin routes
router.get('/admin-auth', requireSignIn, isAdmin,(req, res)=>{
  res.status(200).send({ok: true});
})

export default router;
