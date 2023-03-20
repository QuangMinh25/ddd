import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
//import bcrypt from 'bcryptjs';
//let bcrypt = require('bcryptjs');



connectDB()

export default async(req, res) => {
    switch (req.method) {
        case "PATCH":
            await forgotPassword(req, res)
            break;
    }
}
// export default async(req, res) => {
//     switch (req.method) {
//         case 'PUT':

//             const { email } = req.body
//             const passwordHash = await bcrypt.hash("user123")

//             await User.findOneAndUpdate({ email: req.body.email }, { password: passwordHash })
//             const transporter = nodemailer.createTransport({
//                 service: "gmail",
//                 auth: {
//                     user: "vanhieu981981@gmail.com",
//                     pass: "jkuspqiqdmzuvrkh"
//                 }
//             });
//             const mailOptions = {
//                 from: "vanhieu981981@gmail.com",
//                 to: req.body.email,
//                 subject: "Xác thực địa chỉ email",
//                 text: `Xác thực địa chỉ email`,
//                 html: `
//     <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
//         <h2 Password của bạn là user123.</h2>
//         `
//             };
//             const result_ = transporter.sendMail(mailOptions);

//             res.json({ msg: "Update Success!" })

//             break;

//     }
// }

const forgotPassword = async(req, res) => {
    try {
        //const result = await auth(req, res)
        const { email } = req.body
            //const passwordHash = "user123";
        const passwordHash = await bcrypt.hash("user123", 12)

        await User.findOneAndUpdate({ email: req.body.email }, { password: passwordHash })
        console.log("sdskds" + req.body.email)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vanhieu981981@gmail.com",
                pass: "jkuspqiqdmzuvrkh"
            }
        });
        const mailOptions = {
            from: "vanhieu981981@gmail.com",
            to: req.body.email,
            subject: "Reset Password",
            text: `Reset Password`,
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng bạn đến với NHÀ SÁCH ĐÔNG NAM Á.</h2>
            <p>Password mới của bạn là user123
            </p>
      
    `
        };

        const result_ = transporter.sendMail(mailOptions);

        console.log("đâsdasdasds" + result_)

        res.json({ msg: "Update Success!" })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}