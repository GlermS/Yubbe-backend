import nodemailer = require("nodemailer");
import * as SMTPTransport from "nodemailer/lib/smtp-transport";

class Mailer{
  transportOptions: SMTPTransport.Options

  constructor(){
    // create reusable transporter object using the default SMTP transport
    this.transportOptions = {
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'guilhermesansou@hotmail.com', // generated ethereal user
        pass: '#Santos075', // generated ethereal password
      },
    };
  }

  ConfirmSignup = async (email)=>{
    const transporter = nodemailer.createTransport(this.transportOptions)

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Yubbe Club" <guilhermesansou@hotmail.com>', // sender address
      to: email, // list of receivers
      subject: "Confirmação de Registro", // Subject line
      text: "Parabéns, o seu registro foi confirmado. Acesse a nossa plataforma no link:\nhttps:yubbe.club", // plain text body
      html: "<h1>Parabéns!</h1><p>O seu registro foi confirmado. Acesse a nossa plataforma no link:</p><a href=https:yubbe.club>Acesso à Plataforma</a>", // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
}

export default Mailer;