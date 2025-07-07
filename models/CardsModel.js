const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    cover: {
      type: String,
      required: [true, "Cover Image is required"],
    },

    fullName: {
      type: String,
      required: [true, "Name is required"],
      minlength: [1, "Name should be at least 1 characters long"],
      maxlength: [200, "Name should not exceed 200 characters"],
    },

    designation: {
      type: String,
      minlength: [1, "Designation should be at least 1 characters long"],
      maxlength: [500, "Designation should not exceed 500 characters"],
    },
    linkedinLink: {
      type: String,
    },
    fulldesc:{
      type:String,
    },

    address: {
      type: String,
      // minlength: [1, "Address should be at least 1 characters long"],
    },

    role: {
      type: String,
      enum: {
        values: [ "mentorpool",
          "anchorpool",
          "cohort2023_25",
          "cohort2022_24",
          "cohort2018_20",
          "cohort2024_26",
          "compassionate",
          "theBoard",
          "theTeam",
          "Usboard"],
        message: '{VALUE} is not a valid role. Allowed roles are: mentorpool, anchorpool,cohort2023_25, cohort2022_24, cohort2018_20, cohort2024_26, compassionate, theBoard, theTeam, Usboard',
    }
    },
  },
  { timestamps: true }
);

const CardModel = mongoose.model("cardmodel", CardSchema);

module.exports = CardModel;
