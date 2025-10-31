// server.js
// const express = require('express');
// const nodemailer = require('nodemailer');
import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const Port = process.env.PORT || 3000
const app = express();


app.use(express.json());

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raghavji014@gmail.com',     // Replace with your Gmail
        pass: 'esvz nlcv slax cysv' // Replace with your Gmail App Password
    }
});

app.use(express.urlencoded({extended:true}))
// API route to send "Hi" email
app.post('/send-hi', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        await transporter.sendMail({
            from: '"Hi Bot" <raghavji014@gmail.com>',
            to: email,
            subject: 'Hi from Node.js Server',
            text: 'Hi 👋, this is a test email!'
        });

        res.json({ success: true, message: `Hi sent to ${email}` });
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(Port, () => console.log('Server running on port 3000'));