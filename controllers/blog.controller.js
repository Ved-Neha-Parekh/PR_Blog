import Blog from "../models/blogModel.js";
import path from "path";
import fs from "fs";

const blogController = {
  addBlogPage(req, res) {
    return res.render("./pages/addBlogPage");
  },
  async addBlog(req, res) {
    try {
      const { title, content } = req.body;

      const authorId = res.locals.user.id;

      let imgPath = "";

      if (req.file) {
        imgPath = `/uploads/${req.file.filename}`;
      }

      await Blog.create({
        title: title,
        content: content,
        author: authorId,
        coverImage: imgPath || undefined,
      });

      return res.redirect("/getAllBlogs");
    } catch (error) {
      console.log("Error creating blog:", error.message);
      return res.redirect("/addBlogPage");
    }
  },
  async getAllBlogs(req, res) {
    try {
      const getAllBlogs = await Blog.find({}).populate("author", "name");

      return res.render("./pages/viewAllBlogs", {
        blogs: getAllBlogs,
      });
    } catch (error) {
      console.log("Error while fetching blogs: ", error.message);
      return res.redirect("/");
    }
  },
  async getAllMyBlogs(req, res) {
    try {
      const authorId = res.locals.user.id;

      const myBlogs = await Blog.find({ author: authorId }).populate(
        "author",
        "name"
      );

      return res.render("./pages/getAllMyBlogs", {
        blogs: myBlogs,
      });
    } catch (error) {
      console.log("Error while fetching 'My Blogs':", error.message);
      return res.redirect("/");
    }
  },
  async deleteBlog(req,res){
    try {
      const blogId = req.params.id;
      const user = res.locals.user;

      const blog = await Blog.findById(blogId);
      if (!blog) {
        console.log("Blog not found.");
        return res.redirect("/getAllBlogs");
      }

      const isAuthorized = user.role === "admin" || blog.author.toString() === user.id.toString();
      if (!isAuthorized) {
        console.log("Unauthorized delete attempt.");
        return res.redirect("/getAllBlogs");
      }

      const imgPath = blog.coverImage;
      if (imgPath) {
        const path = imgPath.substring(1);
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }

      await Blog.findByIdAndDelete(blogId);

      return res.redirect("/getAllBlogs");
    } catch (error) {
      console.log("Error while deleting a blog:", error.message);
      return res.redirect("/getAllBlogs");
    }
  },
  async editBlogPage(req, res) {
    try {
      const blogId = req.params.id;
      const user = res.locals.user;

      const blog = await Blog.findById(blogId);
      if (!blog) {
        console.log("Blog not found.");
        return res.redirect("/getAllBlogs");
      }

      const isAuthorized = user.role === "admin" || blog.author.toString() === user.id.toString();
      if (!isAuthorized) {
        console.log("Unauthorized edit attempt.");
        return res.redirect("/getAllBlogs");
      }

      return res.render("./pages/editBlogPage", {
        blog: blog,
      });

    } catch (error) {
      console.log("Error while edit a blog:", error.message);
      return res.redirect("/getAllBlogs");
    }
  },
  async updateBlog(req,res){
    try {
      const { title, content } = req.body;
      const blogId = req.params.id;
      const user = res.locals.user;

      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.redirect("/getAllBlogs");
      }

      const isAuthorized =
        user.role === "admin" || blog.author.toString() === user.id.toString();

      if (!isAuthorized) {
        console.log("Unauthorized update attempt.");
        return res.redirect("/getAllBlogs");
      }

      blog.title = title;
      blog.content = content;

      if(req.file){
        const oldImgPath = blog.coverImage;
        const newImgPath = `/uploads/${req.file.filename}`;

        blog.coverImage = newImgPath;

        if (oldImgPath) {
          const path = oldImgPath.substring(1);
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
        }
      }

      await blog.save();

      return res.redirect("/getAllBlogs");
    } catch (error) {
      console.log("Error while updating a blog:", error.message);
      return res.redirect("/getAllMyBlogs");
    }
  }
};

export default blogController;
