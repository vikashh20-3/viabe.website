// server.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const allowedOrigins = ['https://vibae.fun', 'https://www.vibae.fun', 'https://api.vibae.fun'];
app.use(cors({
  origin: function(origin, callback){
    console.log("Request origin:", origin);
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'CORS policy does not allow this origin: ' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));



app.use(express.json());

// POST /send-email
app.post("/send-email", async (req, res) => {
  const {  subject, message } = req.body;
 const to ='ppeeddrroo5ee@gmail.com';
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vvikashrao203@gmail.com", 
        pass: "usfs fxvs hwzj ltqr",
      },
    });

    let info = await transporter.sendMail({
      from: `"Vibae"`,
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    console.log("Email sent: ", info.messageId);
    res.json({ success: true, id: info.messageId });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Email server running on http://localhost:${PORT}`));
