require('dotenv').config();
const nodemailer = require('nodemailer');

const MailVerification = async (email,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.emailID,
                pass: process.env.Password
            }
        });
        
        const mailOptions = await transporter.sendMail({
            from: 'harshitvarma638@gmail.com',
            to: email,
            subject: 'OTP for verification',
            text: text
        });
    }
    catch(error){
        console.log(error.message);
    }
};

module.exports = {MailVerification};