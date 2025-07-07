const mongoose = require("mongoose");
const TestimonialSchema = new mongoose.Schema({
  logo: {
    type: String,
  },

  Video: {
    type: String,
  },

  VideoLink: {
    type: String,
  },

  thumbnailImg: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [1, "Title should be at least 1 characters long"],
    maxlength: [100, "Title should not exceed 100 characters"],
  },

  desc: {
    type: String,
    required: [true, "Discription is required"],
    minlength: [1, "Discription should be at least 1 characters long"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: {
      values: ["bfp", "impact"],
      message: "{VALUE} is not a valid role. Allowed roles are: bfp, impact",
    },
  },
});

const Testimonial = mongoose.model("textimonial", TestimonialSchema);

module.exports = Testimonial;
