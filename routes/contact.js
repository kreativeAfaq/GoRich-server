const router = require("express").Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// Send User a Email --------------------------------------

router.post("/email", async (req, res) => {
  try {
    var Mailoptions = {
      from: process.env.USER_EMAIL,
      to: process.env.RECIEVER_EMAIL,
      subject: `A Message From Go-Rich by ${req.body.name}`,
      html: `<p>Name : ${req.body.name}</p></br>
              <p>Phone Number : ${req.body.mobileno}</p></br>
              <p>Email : ${req.body.email}</p></br>
              <p>Message : ${req.body.message}</p></br>`,
    };

    transporter
      .sendMail(Mailoptions)
      .then(() => {
        res.status(200).json({ message: "Email Sent Successfully" });
      })
      .catch((err) => {
        res.status(401).json(err.message);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
