import { Router } from "express";
import adminRouter from "./admin.route.js";
import blogRouter from "./blog.route.js";

const router = Router();

router.use("/",adminRouter);
router.use("/",blogRouter);

export default router;