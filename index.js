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
    console.log("post request recieved")
    const {email} = req.body // email address to send email to recieved from the client
    const {pass} = req.body // password to send to the client
    let transporter = nodemailer.createTransport({ // create reusable transporter object using the service you want to use
        service : 'gmail',
        auth: {
            user: 'hms.caretrack.ios@gmail.com', // your email address to send email from
            pass: 'mrkqnzcbnmybqcsk' // your gmail account app password, you can generate one in your gmail account settings 
        }
    });
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('/Users/gauravganju/Developer/EmailAPI/views'), // location of your templates folder
            defaultLayout: false,
        },
        viewPath: path.resolve('/Users/gauravganju/Developer/EmailAPI/views/'),
    };
    console.log(email)
    var details = {
        from: '"Caretrack" <hms.caretrack.ios@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Welcome User',
        template: 'emailTemplate', // the name of the template file i.e email.handlebars
        context:{
            password: pass, //password passed to the template
        }
    };
    transporter.use('compile', hbs(handlebarOptions));
    transporter.sendMail
    
    res.send('Email Sent!');
})

app.listen(port, () => console.log(`Server running on port ${port}...`));
