import express from "express"
import dotenv from "dotenv"
import {Database} from "./utils/dbconfig";

dotenv.config();

const app = express();

Database.getConnection();

app.get('/' , (req , res) => {
    res.json({
        msg : "hello"
    })
})

app.listen(process.env.PORT , () => console.log("server is running..."))