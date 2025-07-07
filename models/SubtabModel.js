const mongoose = require("mongoose");
const Graph = require("./GraphModel");

const SubTabSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [1, "Title should be at least 1 character long"],
    },
    images: {
      type: String,
    },
    tab: {
      type: mongoose.Schema.ObjectId,
      ref: "Graph",
    },
  },
  { timestamps: true }
);

const Subtabs = mongoose.model("subtab", SubTabSchema);
module.exports = Subtabs;
