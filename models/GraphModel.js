const mongoose = require("mongoose");

const GraphSchema = new mongoose.Schema(
  {
    tabName: {
      type: String,
      required: [true, "Please provide tabName"],
    },
    desc: {
      type: String,
    },
    graphdetails: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Virtual field for subtabs
GraphSchema.virtual("subtabs", {
  ref: "subtab", // Match the exact model name in SubtabModel.js
  foreignField: "tab",
  localField: "_id",
});

// Ensure virtual fields are included in JSON and Object output
GraphSchema.set("toJSON", { virtuals: true });
GraphSchema.set("toObject", { virtuals: true });

const Graph = mongoose.model("Graph", GraphSchema);
module.exports = Graph;
