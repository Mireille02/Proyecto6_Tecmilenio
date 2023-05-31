const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: "9f4c1fb13246fa",
        pass: "c38f23c726e0b5"
    },
})

message = {
    from: "deejemplo@email.com",
    to: "paraejemplo@email.com",
    subject: "Titulo",
    text: "Coreo SMTP de prueba parte 2"
}
transporter.sendMail(message, function (err, info) {
    if (err) {
        console.log(err)       
    }else{
        console.log(info);
    }
}) 

