var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rccgheritageofgod@gmail.com',
        pass: 'szgswawnjcqrsdlo',
        secure:true
        
    }
});

export function sendmail(email,msg, subject,fmail) {
    var mailOptions = {
        from: fmail,
        to: email,
        subject: subject,
        text: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

