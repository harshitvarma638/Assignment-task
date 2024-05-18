const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "harshitvarma638@gmail.com",
        pass: "imcirblzohdplcib"
    }
});

module.exports = transporter;