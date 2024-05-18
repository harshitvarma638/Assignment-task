const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const accountCreation = require('./Models/schema');
const bodyParser = require('body-parser');
const transporter = require('./Services/nodemailerConfig');
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

const db = mongoose.connection;
db.on('error', (error)=> console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use('/api/user',require('./Router/AccountRouter'));
app.use('/api/otp',require('./Router/OTPRouter'));

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})