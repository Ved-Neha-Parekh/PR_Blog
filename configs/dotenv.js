import env  from "dotenv";
env.config();

const dotenv = {
    PORT : process.env.PORT,
    MONGO_DB_URL : process.env.MONGO_DB_URL
}

export default dotenv;