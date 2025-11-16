import Blog from "../models/blogModel.js";

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
        imgPath = `/uploads/blogs/${req.file.filename}`;
      }

      await Blog.create({
        title: title,
        content: content,
        author: authorId,
        coverImg: imgPath || undefined,
      });

      return res.redirect("/");
    } catch (error) {
      console.log("Error creating blog:", error.message);
      return res.redirect("/addBlogPage");
    }
  },
  async getAllBlogs(req, res) {
    try {
      const allBlogs = await Blog.find({}).populate("author", "name");

      return res.render("./pages/viewAllBlogs", {
        blogs: allBlogs,
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
};

export default blogController;
