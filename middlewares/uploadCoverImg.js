import multer from "multer";
import path from "path";

const blogStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now();
        const extension = path.extname(file.originalname);
        cb(null,"blog-" + uniqueSuffix + extension);
    }
})

export const uploadBlogImg = multer({
    storage:blogStorage
}).single("coverImage");

