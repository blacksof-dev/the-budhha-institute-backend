const RazorPay = require("razorpay");

const createRazorpayInstance = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        console.error("Razorpay key ID or key secret is missing");
    }

    return new RazorPay({
        key_id: keyId,
        key_secret: keySecret,
    });
};

module.exports = {
    createRazorpayInstance
};