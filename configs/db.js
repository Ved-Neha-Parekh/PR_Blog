import mongoose from "mongoose";
import dotenv from "./dotenv.js";

const db = async () => {
    try {
        await mongoose.connect(dotenv.MONGO_DB_URL)
        console.log("Database connected successfully...");
    } catch (error) {
        console.log("Connection error: ",error.message);
    }
}

export default db();