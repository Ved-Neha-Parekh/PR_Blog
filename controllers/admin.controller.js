import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const adminController = {
  dashboard(req, res) {
    return res.render("./index");
  },

  signUpPage(req, res) {
    return res.render("./pages/signUpPage");
  },

  async signUp(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        return res.redirect(req.get("Referrer") || "/");
      }

      let data = await User.create({
        name: name,
        email: email,
        password: password,
      });

      console.log(`Account created by ${data.name}.`);
      return res.redirect("/login");
    } catch (error) {
      console.log(`Sign up error: ${error.message}`);
      return res.redirect("/signUp");
    }
  },

  loginPage(req, res) {
    return res.render("./pages/loginPage");
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email: email,
        status: "active"
      });
      if (!user) {
        console.log("User not found...");
        return res.redirect("/login");
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (isMatched) {
        console.log("User logged in successfully...");
        res.cookie("userId", user.id);
        return res.redirect("/");
      } else {
        console.log("Wrong password entered...");
        return res.redirect("/login");
      }
    } catch (error) {
      console.log("logging error: ", error.message);
      return res.redirect("/login");
    }
  },

  logout(req, res) {
    try {
      res.clearCookie("userId");
      return res.redirect("/login");
    } catch (error) {
      console.log("Error in logout: ", error.message);
      return res.redirect("/");
    }
  },

  async getAllUsersPage(req, res) {
    try {
      const allUsers = await User.find({});

      return res.render("./pages/getAllUsers", {
        users: allUsers,
      });
    } catch (error) {
      console.log("Fetching error: ", error.message);
      return res.redirect("/");
    }
  },

  async toggleUserStatus(req,res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (user.status === "active") {
        user.status = "inactive";
      } else {
        user.status = "active";
      }

      await user.save();

      return res.redirect("/getAllUsers");
    } catch (error) {
      console.log("Error in toggling user status:", error.message);
      return res.redirect("/getAllUsers");
    }
  }
};

export default adminController;
