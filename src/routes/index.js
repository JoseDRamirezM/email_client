const { Router } = require("express");
const router = Router();

const nodemailer = require("nodemailer");
const pop3 = require("node-pop3");
let email, pwd;

router.get("/", (req, res) => {
    res.render("index", { title: "Correo Electrónico" });
});

router.get("/email", (req, res) => {
    res.render("email", { title: "Envía un correo" });
});

router.get("/success", (req, res) => {
    res.render("success", { title: "Información de envío" });
});

router.get("/inbox", async (req, res) => {
    const pop3_client = new pop3({
        user: email,
        password: pwd,
        host: "arejo.com",
    });
    console.log(email, pwd);
    let list = await pop3_client.UIDL();
    let mails = [];
    list.forEach(async (element) => {
        mails.push(await pop3_client.RETR(element[0]).split(`\n`));
    });
    res.render("inbox", {
        title: "Bandeja de entrada",
        mails: mails,
        email: email,
    });
});

router.post("/send-email", async (req, res) => {
    const { from, to, subject, message } = req.body;
    contentHTML = `
        <p>${message}</p>
    `;
    let transporter = nodemailer.createTransport({
        host: "arejo.com",
        port: 25,
        secure: false,
        tls: {
            rejectUnauthorized: false,
        },
    });

    let info = await transporter.sendMail({
        from: `${from} <${email}>`, // sender address,
        to: to,
        subject: subject,
        html: contentHTML,
    });

    // console.log('Message sent: %s', info.messageId);

    res.redirect("success");
});

router.post("/login", (req, res) => {
    email = req.body.email;
    pwd = req.body.password;
    res.redirect("email");
});

module.exports = router;
