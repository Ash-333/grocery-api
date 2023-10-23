const nodemailer = require('nodemailer');

const sendResetEmail = async (toEmail, resetToken) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Use your email service provider's SMTP settings
      service: 'Gmail',
      auth: {
        user: 'ashishkamat121@gmail.com',
        pass: 'aorivtnadnbopqri',
      },
    });

    // Define email content
    const mailOptions = {
      from: 'ashishkamat121@gmail.com',
      to: toEmail,
      subject: 'Password Reset',
      text: `To reset your password, use this code: ${resetToken}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendResetEmail;
