import { Router } from "express";
import blogController from "../controllers/blog.controller.js";
import { checkAuth } from "../middlewares/userAuth.js";
import { uploadBlogImg } from "../middlewares/uploadCoverImg.js";

const router = Router();

router.get("/addBlogPage",checkAuth,blogController.addBlogPage);

router.post("/addBlogPage",checkAuth,uploadBlogImg,blogController.addBlog);

router.get("/getAllBlogs",checkAuth,blogController.getAllBlogs);

router.get("/getAllMyBlogs",checkAuth,blogController.getAllMyBlogs);

export default router;