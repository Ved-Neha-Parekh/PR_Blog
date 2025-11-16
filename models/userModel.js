import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum : ["active","inactive"],
      default: "active"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = await bcrypt.hash(this.password,10);
        return next();
    } catch (error) {
        console.log(`Pre error: ${error.message}`);
        return next(error.message);
    }
})

const User = mongoose.model("userModel",userSchema);

export default User;
