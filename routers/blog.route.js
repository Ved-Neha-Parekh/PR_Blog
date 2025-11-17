import { Router } from "express";
import blogController from "../controllers/blog.controller.js";
import { checkAuth } from "../middlewares/userAuth.js";
import { uploadBlogImg } from "../middlewares/uploadCoverImg.js";

const router = Router();

router.use(checkAuth);
router.get("/addBlogPage", blogController.addBlogPage);

router.post("/addBlogPage", uploadBlogImg, blogController.addBlog);

router.get("/getAllBlogs", blogController.getAllBlogs);

router.get("/getAllMyBlogs", blogController.getAllMyBlogs);

router.get("/edit/:id", blogController.editBlogPage);
router.post("/edit/:id", uploadBlogImg ,blogController.updateBlog);

router.get("/delete/:id", blogController.deleteBlog);


export default router;
