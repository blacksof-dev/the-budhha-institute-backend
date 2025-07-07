const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [1, "Full name should be at least 3 characters long"],
    maxlength: [50, "Full name should not exceed 50 characters"],
  },

  email: {
    type: String,
    // unique: true,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*$/,
      "Please enter a valid email address",
    ],
    trim: true,
  },

  contactNumber: {
    type: String,
    required: [true, "Contact Number is required"],
    maxlength: [10, "Contact should not exceed 10 Numbers"],
    match: [
      /^\d{0,10}$/,
      "Contact number should only contain numbers between 0 and 10 digits",
    ],
  },

  industry: {
    type: String,
    required: [true, "Industry Name is required"],
    minlength: [1, "Industry should be at least 3 characters long"],
    maxlength: [500, "Industry should not exceed 500 characters"],
  },

  howDidYouGetToKnowUs: {
    type: String,
    required: [true, "How did you know  is  required"],
    minlength: [1, "HowDidYouGetToKnow should be at least 3 characters long"],
    maxlength: [500, "HowDidYouGetToKnowUs should not exceed 500 characters"],
  },

  queryRelatedTo: {
    type: String,
    maxlength: [500, "QueryRelatedTo should not exceed 500 characters"],
  },

  query: {
    type: String,
    maxlength: [500, "Query should not exceed 500 characters"],
  },
});

const ContactUs = mongoose.model("contact", ContactSchema);

module.exports = ContactUs;
