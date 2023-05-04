const express = require('express');
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
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

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('/Users/gauravganju/Developer/EmailAPI/views'),
            defaultLayout: false,
        },
        viewPath: path.resolve('/Users/gauravganju/Developer/EmailAPI/views/'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    var mailOptions = {
        from: '"Caretrack" <hms.caretrack.ios@gmail.com>', // sender address
        to: 'gauravganju@gmail.com', // list of receivers
        subject: 'Welcome User',
        template: 'emailTemplate', // the name of the template file i.e email.handlebars
        context:{
            password: pass,
        }
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: '+ info.response + ' ' + info.messageId);
    });
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