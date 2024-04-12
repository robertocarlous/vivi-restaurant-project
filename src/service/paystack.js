const express = require('express');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

//paystack payment method
router.post("/paystack/payment", async (req, res) => {
  try {
    const amount = parseFloat(req.body.totalAmount);
    if (isNaN(amount) || amount <= 0 || amount % 1 !== 0) {
      throw new Error('Invalid amount');
    }

    const params = JSON.stringify({
      email: req.body.email,
      amount:req.body.totalAmount 
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };


    const reqPaystack = https
      .request(options, (resPaystack) => {
        let data = "";

        resPaystack.on("data", (chunk) => {
          data += chunk;
        });

        resPaystack.on("end", () => {
          res.send(data);
          console.log(JSON.parse(data));
        });
      })
      .on("error", (error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred while communicating with Paystack API" });
      });

    reqPaystack.write(params);
    reqPaystack.end();

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid amount" });
  }
});


//verify payment

router.get("/paystack/payment/verifypayment", async (req, res) => {
  try {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/verify/hfsgoojifc",
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const request = https.request(options, (resPaystack) => {
      let data = "";

      resPaystack.on("data", (chunk) => {
        data += chunk;
      });

      resPaystack.on("end", () => {
        console.log(JSON.parse(data));
      });
    });

    request.on("error", (error) => {
      console.error(error);
    });

    request.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = { router };
