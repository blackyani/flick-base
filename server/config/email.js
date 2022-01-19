const nodeMailer = require('nodemailer');
const MailGen = require('mailgen');
require('dotenv').config();

let transporter = nodeMailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const contactMail = async (contact) => {
    try {
        const mailGenerator = new MailGen({
            theme: 'default',
            product: {
               name: 'Flickbase',
               link: `${process.env.EMAIL_MAIN_URL}`
            }
        });
        const email = {
            body: {
                    intro: [
                        'You have some email',
                        `Email: ${contact.email}`,
                        `First Name: ${contact.firstname}`,
                        `Last Name: ${contact.lastname}`,
                    ],
                outro: [
                    `${contact.message}`
                ]
            }
        }

        const generatedEmail = mailGenerator.generate(email)

        const message = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "Contact",
            html: generatedEmail
        }

        const response = await transporter.sendMail(message);

        if (response.accepted.length) {
            return true;
        }
    } catch (error) {
        throw error;
    }
};

const registerEmail = async (userEmail, token) => {
    try {
        const mailGenerator = new MailGen({
            theme: 'default',
            product: {
                name: 'Flickbase',
                link: `${process.env.EMAIL_MAIN_URL}`
            }
        });
        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome on board!',
                action: {
                    instructions: `To validate your account please click here:`,
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${token}`
                    }

                },
                outro: 'Need help? Just reply this email'
            }
        }

        const generatedEmail = mailGenerator.generate(email)

        const message = {
            from: userEmail,
            to: process.env.EMAIL,
            subject: "Welcome to Flicker base",
            html: generatedEmail
        }

        const response = await transporter.sendMail(message);

        if (response.accepted.length) {
            return true;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    contactMail,
    registerEmail
}