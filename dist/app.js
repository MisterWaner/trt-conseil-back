/******************** Import Modules *****************/
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
config();
/****************** Create app ***********************/
const app = express();
const port = process.env.SERVER_PORT;
/****************** Middlewares **********************/
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
    ],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
/****************** Import Routers **********************/
/****************** Routes ******************************/
app.get("/", (req, res) => {
    res.send("API démarée et fonctionnelle !");
});
/********************** Server **************************/
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
