const { MailVerification } = require('../Services/nodemailerConfig');
const accountCreation = require('../Models/schema');

function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const sendOTP = async(req,res) => {
    try{
        const { email } = req.body;
        // const user = await accountCreation.find({ email });
        // if(user){
        //     return res.status(400).send({success: false, message: "Email already exists"});
        // }
        if(!email || !/\S+@\S+\.\S+/.test(email)){
            return res.status(400).send({success:false,message: 'Invalid email address'});
        }
        const otp = generateOTP();
    
        req.session.otp = otp;
        req.session.email = email;

        const text = `Your OTP for verification is ${otp}`;
        await MailVerification([email],text);
        const mailResponse = await MailVerification([email], text);
        console.log(mailResponse);
        return res.status(200).send({success: true, message: "OTP sent successfully"});
    } 
    catch(err){
        console.log(err);
        return res.status(500).send({success: false, message: "Failed to send OTP"});
    }
}

const verifyOTP = async(req,res) => {
    try{
        const { email, otp } = req.body;
        if(!req.session.otp || !req.session.email){
            return res.status(400).send({status:false,message:"Regenerate OTP"});
        }

        if(otp == req.session.otp && req.session.email === email){
            req.session.otp = null;
            req.session.email = null;
            return res.status(200).send({success: true, message: "OTP verified successfully"});
        }else{
            return res.status(401).send({success: false, message: "OTP verification failed"});
        }
    }
    catch(error){
        return res.status(404).send({status: false,message:"Internal Server Error"});
    }
}

module.exports = {sendOTP,verifyOTP};