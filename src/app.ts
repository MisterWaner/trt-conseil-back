/******************** Import Modules *****************/
import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./lib/mail/mailer.js";

config();

/****************** Create app ***********************/
const app = express();
const port = process.env.SERVER_PORT;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

/****************** Middlewares **********************/
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
        ],
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/upload", express.static(`${__dirname}/upload`));

/****************** Import Routers **********************/
import roleRouter from "./routers/role-router.js";
import userRouter from "./routers/user-router.js";
import adminRouter from "./routers/admin-router.js";
import consultantRouter from "./routers/consultant-router.js";
import recruiterRouter from "./routers/recruiter-router.js";
import candidatRouter from "./routers/candidat-router.js";
import offerRouter from "./routers/offer-router.js";
import applicationRouter from "./routers/application-router.js";
import authRouter from "./routers/auth-router.js";
import resumeRouter from "./routers/resume-router.js";

/****************** Routes ******************************/
app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle !");
});
app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/consultants", consultantRouter);
app.use("/recruiters", recruiterRouter);
app.use("/candidats", candidatRouter);
app.use("/offers", offerRouter);
app.use("/applications", applicationRouter);
app.use("/auth", authRouter);
app.use("/resumes", resumeRouter);

/********************** Server **************************/
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
