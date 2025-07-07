const { createRazorpayInstance } = require("../config/razorpay");
const crypto = require("crypto");
const Payment = require("../models/PaymentModel");
const nodemailer = require("nodemailer");
const razorpayinstance = createRazorpayInstance();
const puppeteer = require("puppeteer")
const fs = require("fs-extra");
const path = require("path");
const pdf = require("html-pdf-node");
const CreateOrder = async (req, res) => {
    try {
      const { amount, fullname, email } = req.body;
  
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ status: "fail", error: "Provide valid amount" });
      }
  
      if (!amount || !fullname || !email) {
        return res.status(400).json({ status: "fail", error: "All fields are required" });
      }
  
      const options = {
        amount: amount,
        receipt: `receipt_order_1`,
      };
  
      razorpayinstance.orders.create(options, async (err, order) => {
        if (err) {
          console.error("Error creating order:", err);
          return res.status(400).json({ status: "fail", error: err.message });
        }
  
        // ✅ Step 1: Generate HTML for Certificate
        const emailContent = `
          <html>
          <head>
            <title>Certificate</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              .certificate { border: 5px solid #000; padding: 20px; width: 80%; margin: auto; }
              h1 { font-size: 30px; color: #333; }
              p { font-size: 18px; }
            </style>
          </head>
          <body>
            <div class="certificate">
              <h1>Certificate of Appreciation</h1>
              <p>This is to certify that <strong>${fullname}</strong></p>
              <p>Has donated <strong>$${amount}</strong> to Global Health Outreach</p>
              <p>On the 1st of December, 2024.</p>
            </div>
          </body>
          </html>
        `;
  
        // ✅ Step 2: Convert HTML to PDF
        // const pdfPath = path.join(__dirname, "certificate.pdf");
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.setContent(emailContent, { waitUntil: "load" });
        // await page.pdf({ path: pdfPath, format: "A4" });
        // await browser.close();
  
        // ✅ Step 3: Send Email with PDF Attachment
        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.DEV_EMAIL,
            pass: process.env.DEV_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
  
        const mailOptions = {
          from: process.env.DEV_EMAIL,
          to: "aditi.upadhyay@blacksof.com",
          subject: "Your Donation Certificate",
          html: `<p>Dear ${fullname},</p>
                 <p>Thank you for your generous donation of <strong>$${amount}</strong>.</p>
                 <p>Please find attached your donation certificate.</p>`,
          // attachments: [
          //   {
          //     filename: "Certificate.pdf",
          //     path: pdfPath,
          //     contentType: "application/pdf",
          //   },
          // ],
        };
  
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ status: "fail", error: "Email not sent" });
          }
          console.log("Email sent: " + info.response);
  
        
          res.status(200).json({ status: "success", order });
        });
      });
    } catch (error) {
      console.error("Error in CreateOrder:", error.message);
      return res.status(500).json({ status: "fail", error: error.message });
    }
  };

// const CreateOrder = async (req, res) => {
//     try {
//         const { amount, fullname, email } = req.body;

//         if (isNaN(amount) || amount <= 0) {
//             return res.status(400).json({ status: "fail", error: "Provide a valid amount" });
//         }

//         if (!amount || !fullname || !email) {
//             return res.status(400).json({ status: "fail", error: "All fields are required" });
//         }

//         const options = {
//             amount: amount,
//             receipt: `receipt_order_1`,
//         };

//         razorpayinstance.orders.create(options, async (err, order) => {
//             if (err) {
//                 console.error("Error creating order:", err);
//                 return res.status(400).json({ status: "fail", error: err.message });
//             }

          
//             const emailContent = `
//                 <html>
//                 <head>
//                     <title>Certificate</title>
//                     <style>
//                         body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
//                         .certificate { border: 5px solid #000; padding: 20px; width: 80%; margin: auto; }
//                         h1 { font-size: 30px; color: #333; }
//                         p { font-size: 18px; }
//                     </style>
//                 </head>
//                 <body>
//                     <div class="certificate">
//                         <h1>Certificate of Appreciation</h1>
//                         <p>This is to certify that <strong>${fullname}</strong></p>
//                         <p>Has donated <strong>$${amount}</strong> to Global Health Outreach</p>
//                         <p>On the 1st of December, 2024.</p>
//                     </div>
//                 </body>
//                 </html>
//             `;

          
//             // const pdfPath = path.join(__dirname, "certificate.pdf");

//             // const file = { content: emailContent };
//             // pdf.generatePdf(file, { format: "A4" }).then((pdfBuffer) => {
//             //     fs.writeFileSync(pdfPath, pdfBuffer);

//             //     // ✅ Step 3: Send Email with PDF Attachment
//             //     const transport = nodemailer.createTransport({
//             //         host: "smtp.gmail.com",
//             //         port: 587,
//             //         secure: false,
//             //         auth: {
//             //             user: process.env.DEV_EMAIL,
//             //             pass: process.env.DEV_PASSWORD,
//             //         },
//             //         tls: { rejectUnauthorized: false },
//             //     });

//             //     const mailOptions = {
//             //         from: process.env.DEV_EMAIL,
//             //         to: "aditi.upadhyay@blacksof.com",
//             //         subject: "Your Donation Certificate",
//             //         html: `<p>Dear ${fullname},</p>
//             //             <p>Thank you for your generous donation of <strong>$${amount}</strong>.</p>
//             //             <p>Please find attached your donation certificate.</p>`,
//             //         attachments: [
//             //             {
//             //                 filename: "Certificate.pdf",
//             //                 path: pdfPath,
//             //                 contentType: "application/pdf",
//             //             },
//             //         ],
//             //     };

//             //     transport.sendMail(mailOptions, (error, info) => {
//             //         if (error) {
//             //             console.error("Error sending email:", error);
//             //             return res.status(500).json({ status: "fail", error: "Email not sent" });
//             //         }
//             //         // console.log("Email sent: " + info.response);

//             //         // ✅ Cleanup: Remove the generated PDF after sending email
//             //         fs.unlinkSync(pdfPath);

//             //         res.status(200).json({ status: "success", order });
//             //     });
//             // }).catch((err) => {
//             //     console.error("Error generating PDF:", err);
//             //     return res.status(500).json({ status: "fail", error: "PDF generation failed" });
//             // });
//         });
//     } catch (error) {
//         console.error("Error in CreateOrder:", error.message);
//         return res.status(500).json({ status: "fail", error: error.message });
//     }
// }

const VerifyOrder = async (req, res) => {
  try {
    const { payment_id, order_id, signature, name, price, email } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);
    const generatedhmac = hmac.digest("hex");

    if (generatedhmac === signature) {
      const paymentdata = new Payment({
        amount: price,
        fullname: name,
        email: email,
      });

      await paymentdata.save();

      return res
        .status(200)
        .json({ status: "success", message: "Payment successfully" });
    } else {
      return res
        .status(502)
        .json({ status: "fail", error: "Payment unsuccessful" });
    }
  } catch (error) {
    return res.status(404).json({ status: "fail", error: error.message });
  }
};

module.exports = {
  CreateOrder,
  VerifyOrder,
};
