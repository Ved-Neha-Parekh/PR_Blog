import User from "../models/userModel.js";

const checkAuth = async (req, res, next) => {
 const {userId} = req.cookies;

 if (!userId) {
  return res.redirect("/login");
 }

 try {
  const user = await User.findById(userId);

  if (user) {
    res.locals.user = user;
    return next();
  } else {
    return res.redirect("/login");
  }
 } catch (error) {
  console.log("User auth error: ",error.message);
  return res.redirect("/login");
 }
};

const isAdmin = (req, res, next) => {
  if (res.locals.user && res.locals.user.role === "admin") {
    return next();
  }

  return res.redirect("/");
};

export {checkAuth,isAdmin};
