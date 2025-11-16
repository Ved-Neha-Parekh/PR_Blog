import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { checkAuth, isAdmin } from "../middlewares/userAuth.js";

const adminRouter = Router();

adminRouter.get("/signUp", adminController.signUpPage);
adminRouter.post("/signUp", adminController.signUp);
adminRouter.get("/login", adminController.loginPage);
adminRouter.post("/login", adminController.login);

adminRouter.use(checkAuth);
adminRouter.get("/", adminController.dashboard);
adminRouter.get("/getAllUsers",adminController.getAllUsersPage);
adminRouter.get(
  "/user/toggleUserStatus/:id",
  isAdmin,
  adminController.toggleUserStatus
);
adminRouter.get("/logout", adminController.logout);

export default adminRouter;
