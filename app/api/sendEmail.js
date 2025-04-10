const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Your email sending logic here
    const { name, email, message } = req.body;
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "alperenworker@gmail.com",
        pass: "vudw nbea epia lcni"
      }
    });

    await transporter.sendMail({
      from: `"${name}" <alperenworker@gmail.com>`,
      to: 'Alperentnrz@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      text: message
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}

  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${gmailUser}>`, // Use auth email as sender
    to: 'Alperentnrz@gmail.com',
    replyTo: email,
    subject: `New message from ${name}`,
    text: message,
    html: `<div>
             <p><strong>From:</strong> ${name} (${email})</p>
             <p>${message}</p>
           </div>`
  };

  try {
    // Verify connection first
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Full error:', error);
    const errorMessage = error.response ? error.response : error.toString();
    res.status(500).json({ 
      error: 'Email sending failed',
      details: errorMessage
    });
  };
