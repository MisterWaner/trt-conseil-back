import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

export function sendEmail(mailOptions: nodemailer.SendMailOptions) {
    const transporter = nodemailer.createTransport({
        host: "smtp.mail.outlook.com",
        port: 587,
        secure: false,
        tls: {
            ciphers: "SSLv3",
        },
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    mailOptions = {
        from: process.env.EMAIL_USER,
        to: "pofeviv871@ikanid.com",
        subject: "Test",
        text: "Cet email est un test",
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });


}
