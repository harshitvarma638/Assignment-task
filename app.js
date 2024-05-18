const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const accountCreation = require('./models/schema');
const bodyParser = require('body-parser');
const transporter = require('./nodemailerConfig');
const session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(session({secret: 'orange',resave: false,saveUninitialized: true}));

const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost:27017/accounts",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const db = mongoose.connection;
db.on('error', (error)=> console.log(error));
db.once('open', () => console.log('Connected to database'));

app.get("/get", async(req,res)=>{
    try{
        const accounts = await accountCreation.find();
        res.json(accounts);
    }catch(err){
        res.send('Error ' + err);
    }
});

app.post("/accountCreation", async(req,res)=>{
    try{
        const account = new accountCreation(req.body);
        const a1 = await account.save();
        res.sendStatus({success: true,message: "Product created successfully"});
    }catch(err){
        res.send('Error');
    }
});

app.post("/sendOTP", async(req,res)=>{
    const { email } = req.body;
    if(!email || !/\S+@\S+\.\S+/.test(email)){
        return res.status(400).send({success:false,message: 'Invalid email address'});
    }
    const otp = generateOTP();

    req.session.otp = otp;
    req.session.email = email;

    const mailOptions = {
        from: 'harshitvarma638@gmail.com',
        to: email,
        subject: 'OTP for verification',
        text: `Your OTP is ${otp} for verification`
    };

    try{
        await transporter.sendMail(mailOptions);
        return res.status(200).send({success: true, message: "OTP sent successfully"});
    } 
    catch(err){
        console.log(err);
        return res.status(500).send({success: false, message: "Failed to send OTP"});
    }
});

app.post("/verifyOTP", async(req,res)=>{
    const { email, otp } = req.body;
    if(otp == req.session.otp && req.session.email === email){
        req.session.otp = null;
        req.session.email = null;
        return res.status(200).send({success: true, message: "OTP verified successfully"});
    }else{
        return res.status(400).send({success: false, message: "OTP verification failed"});
    }
});

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})