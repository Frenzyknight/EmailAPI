const express = require('express');
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000; // port to listen on
app.use(bodyparser.urlencoded ({extended: false}));
app.use(bodyparser.json());
app.get('/', (req, res) => {
    res.send('Hello ios dev this is a get request post use karni hai bro come on !');
    });
app.post('/', async(req, res) => {
    const {email} = req.body // email address to send email to recieved from the client
    const {pass} = req.body // password to send to the client
    let transporter = nodemailer.createTransport({ // create reusable transporter object using the service you want to use
        service : 'gmail',
        auth: {
            user: 'hms.caretrack.ios@gmail.com', // your email address to send email from
            pass: 'hrgpgqlkexnhwzfm' // your gmail account app password, you can generate one in your gmail account settings 
        }
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('/Users/gauravganju/Developer/EmailAPI/views'), // location of your templates folder
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
            password: pass, //password passed to the template
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
