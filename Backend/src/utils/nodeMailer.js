import nodemailer from "nodemailer"; 
import { ApiError } from "./ApiError.js";


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nathanael5@ethereal.email',
        pass: 'vmndyCy4jc36CHmCnF'
    }
});

export const sendEmail = async(to , subject ,text)=>{
    try {
        const mailOptions = {
            from : 'nathanael5@ethereal.email' , 
            to , 
            subject ,
             text 
        }

        await transporter.sendMail(mailOptions); 
        console.log("Email sent successfully to : " ,to); 
    } catch (error) {
        throw new ApiError(500 , "could not send email ")
    }
}