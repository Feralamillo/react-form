require ('dotenv').config()
const mailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

async function mailjet(email, name, description) {
  const transport = mailer.createTransport(
    smtp({
      host: 'in-v3.mailjet.com',
      port: 2525,
      auth: {
        user: process.env.MAILJET_API_KEY || '<your-mailjet-api-key',
        pass: process.env.MAILJET_API_SECRET || '<your-mailjet-api-secret>',
      },
    })
  );

  const json = await transport.sendMail({
    from: process.env.FROM_EMAIL_ADDRESS, // From address
    to: `${process.env.TO_EMAIL_ADDRESS}, ${email}`, // To address
    subject: 'test email from Node.js on Google Cloud Platform', // Subject
    text: `Hello, here are the contact details of the new user from the form.\nName: ${name} \nEmail: ${email} \nDescription: ${description}`,
  });
  // console.log(json);
  return json.rejected.length ? false : true
}

module.exports = mailjet;