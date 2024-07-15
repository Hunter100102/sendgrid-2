const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'spc.cody.hunter@gmail.com',
        from: 'spc.cody.hunter@gmail.com',
        subject: `New message from ${name}`,
        text: message,
        html: `<strong>${message}</strong>`,
    };

    try {
        await sgMail.send(msg);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error sending email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
