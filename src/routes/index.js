const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');
const pop3 = require('node-pop3');
let email, pwd, pop3_client;

router.get('/', (req, res) => {
    res.render('index', { title: 'Correo Electrónico' });
});

router.get('/email', (req, res) => {
    res.render('email', { title: 'Envía un correo' });
});

router.get('/inbox', async (req, res) => {
    const list = await pop3_client.UIDL();
    list.forEach( async element => {
        let retrieve = await pop3_client.RETR(list[0]);
        console.log(retrieve);
    });
    res.render('inbox', { title: 'Bandeja de entrada' });
});


router.post('/send-email', async (req, res) => {
    const { from, to, subject, message } = req.body;
    contentHTML = `
        <p>${message}</p>
    `;
    console.log(req.body)
    console.log(email, pwd)
    // let transporter = nodemailer.createTransport({
    //     host: 'arejo.com',
    //     port: 25,
    //     secure: false,
    //     // auth: {
    //     //     user: 'arielito@arejo.com',
    //     //     pwd: 'arielito'
    //     // },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    // let info = await transporter.sendMail({
    //     from: `${from} <${email}>`, // sender address,
    //     to: to,
    //     subject: subject,
    //     // text: 'Hello World'
    //     html: contentHTML
    // });
    

    //console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    //console.log(retrieve);

    res.redirect('inbox');
});

router.post('/login', (req, res) => {
    email, pwd = req.body;
    pop3_client = new pop3 ({
        user: email,
        pwdword: pwd,
        host: 'arejo.com',
    });
    console.log(email, pwd)
    res.redirect('email');
});

module.exports = router;