import nodemailer = require("nodemailer");
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import moment = require("moment");

class Mailer{
  transportOptions: SMTPTransport.Options

  constructor(){
    // create reusable transporter object using the default SMTP transport
    this.transportOptions = {
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    };
  }

  ConfirmSignup = async (email, name)=>{
    const transporter = nodemailer.createTransport(this.transportOptions)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Yubbe Club" <'+process.env.MAIL_USERNAME+'>', // sender address
      to: email, // list of receivers
      subject: "Confirmação de Cadastro", // Subject line
      text: "Olá," +name+"!\nConfirmamos o seu cadastro na nossa plataforma!\nAgora você pode aproveitar o que temos de melhor.\nNão perca tempo, já marque a sua primeira reunião e Let’s speak English!\n\nEm caso de dúvidas, entre em contato conosco por este mesmo e-mail:\nyubbelanguages@gmail.com ", // plain text body
    });
    console.log("Message sent: %s", info.messageId);
  }

  ConfirmJoinCall = async (email, name, title, description, moderator, date)=>{
    date = moment(date)
    const transporter = nodemailer.createTransport(this.transportOptions)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Yubbe Club" <'+process.env.MAIL_USERNAME+'>', // sender address
      to: email, // list of receivers
      subject: "Confirmação de Registrato na Call", // Subject line
      text: `Oi, ${name}! 

Confirmamos sua inscrição na reunião do(a) mediador(a) ${moderator} no dia ${date.format("DD/MM/YYYY")} às ${date.format("hh:mm")}. 

Você pode cancelar sua inscrição X horas antes do horário da reunião. 

Lembrando que, o cancelamento só pode ser feito pelo nosso site ou aplicativo móvel. 

Tema da reunião: 

${title} 

${description} 
        

Em caso de dúvidas, entre em contato conosco por este mesmo e-mail:
yubbelanguages@gmail.com `
    });
    console.log("Message sent: %s", info.messageId);
  }

  

}

export default Mailer;