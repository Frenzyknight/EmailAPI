const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyparser.urlencoded ({extended: false}));
app.use(bodyparser.json());
app.get('/', (req, res) => {
    res.send('Hello broskis!');
    });
app.post('/', async(req, res) => {
    const {email} = req.body
    const {pass} = req.body
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'hms.caretrack.ios@gmail.com',
            pass: 'hrgpgqlkexnhwzfm'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Care Track" <hms.caretrack.ios@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Welcome to Caretrack", // Subject line
        html: await readFile('/Users/gauravganju/Developer/EmailAPI/emailTemplate.html', 'utf8')
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    res.send('Email Sent!')
})
app.listen(port, () => console.log(`Server running on port ${port}...`));



 // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'gerard.zulauf@ethereal.email', // generated ethereal user
    //         pass: '4DPYv7tWFxYzuDn3wp', // generated ethereal password
    //     },
    // });