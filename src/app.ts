/******************** Import Modules *****************/
import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";

config();

/****************** Create app ***********************/
const app = express();
const port = process.env.PORT;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

/****************** Middlewares **********************/
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization, Content-Disposition, Content-Length, Accept-Encoding, X-CSRF-Token, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, X-Permitted-Cross-Domain-Policies, Referrer-Policy, Strict-Transport-Security, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alt-Svc, Connection, Date, ETag, Expect, Expires, Host, Keep-Alive, Last-Modified, Location, Proxy-Authenticate, Proxy-Authorization, Public-Key-Pins, Retry-After, Server, Set-Cookie, Transfer-Encoding, Upgrade, Vary, Via, Warning, WWW-Authenticate, X-Forwarded-For, X-Forwarded-Proto, X-Powered-By, Content-Security-Policy",
        ],
        
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/upload", express.static(`${__dirname}/dist/upload`));

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
