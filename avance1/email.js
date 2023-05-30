const nodemailer = require('nodemailer');
let transpoter = nodemailer.createTransport({
    host: '',
    port: 2525,
    auth: {
        user: "",
        pass: ""
    }
})

message = {
    from: "",
    to: "",
    subject: "",
    text: ""
}
transporter.sendMail(message, **function**(err, info) {
    if (err) {
        console.log(err)       
    }else{
        console.log(info);
    }
}) 

Host:
sandbox.smtp.mailtrap.io
Port:
25 or 465 or 587 or 2525
Username:
9f4c1fb13246fa
Password:
c38f23c726e0b5
Auth:
PLAIN, LOGIN and CRAM-MD5
TLS:
Optional (STARTTLS on all ports)