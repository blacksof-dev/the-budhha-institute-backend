const Image = require("../models/MarkdownImgUrlModel");
const path = require("path");

const ImageUpload = async (req, res) => {
  try {
    const newImage = new Image({
      imageUrl: req.files["imageUrl"][0].path,
      //   logoUrl:req.files['logoUrl'][0].path,
    });

    await newImage.save();

    return res.status(200).json({ status: "success", message: newImage });
  } catch (error) {
    return res.status(400).json({ status: "fail", details: error.message });
  }
};

module.exports = {
  ImageUpload,
};
