import express from "express";
import dotenv from "./configs/dotenv.js";
import router from "./routers/index.js";
import db from "./configs/db.js";
import cookieParser from "cookie-parser";

const app = express();
const port = dotenv.PORT || 8081;

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads",express.static("uploads"));
app.use(express.urlencoded({extended : true}));

app.use("/",router)

app.listen(port,(err)=>{
    if (!err) {
        console.log(`Server start on http://localhost:${port}`);
    }
})