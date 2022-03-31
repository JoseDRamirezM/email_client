const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');
const pop3 = require('node-pop3')

router.post('/send-email', async (req, res) => {
    const { from, to, subject, email, password, message } = req.body;
    const pop3_client = new pop3 ({
        user: email,
        password: password,
        host: 'arejo.com',
    });

    contentHTML = `
        <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'arejo.com',
        port: 25,
        secure: false,
        // auth: {
        //     user: 'arielito@arejo.com',
        //     pass: 'arielito'
        // },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: email, // sender address,
        to: to,
        subject: subject,
        // text: 'Hello World'
        html: contentHTML
    });

    let retrieve = await pop3_client.RETR(1);
    

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    console.log(retrieve);

    res.redirect('/success.html');
});

module.exports = router;