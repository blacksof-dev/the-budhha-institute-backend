const NewsArticle = require("../models/NewsModels");
const ErrorHandler = require("../utils/ErrorHandler")

const allnews = async (req, res,next) => {

  try {

    const allnews = await NewsArticle.find();
    
    if(!allnews){
      return next(new ErrorHandler("Something went wrong",400));
    }
    return res.status(200).json({
      status: "success",
      data: allnews,
    })
  }

  catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    })
  }

};

const createArticle = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).send("Cover image is required.");
    }
    const { tag, title,targetLink } = req.body;
    const newNews = new NewsArticle({
      cover: req.file.path,
      title: req.body.title,
      tag:req.body.tag,
      targetLink: req.body.targetLink,

    });
    await newNews.save();
    return res.status(201).json({
      status: "success",
      data: newNews
    });
  }
  catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};


const EditNewArticle = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, targetLink,tag } = req.body;
    const cover = req.file ? req.file.path : undefined;

    const updateData = {
      title: title,
      tag:tag,
      targetLink: targetLink,
    };

    if (cover) {
      updateData.cover = cover;
    }

    const updatedNews = await NewsArticle.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedNews) {
      return res.status(404).send("Edited News not found");
    }

    return res.status(200).json({
      status: "success",
      data: updatedNews,
    });

  }
  catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

const deleteArticle = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedItem = await NewsArticle.findByIdAndDelete(id);

    if (deletedItem) {
      return res.status(200).json({
        status: "success",
        data: deletedItem
      });

    }

    else {

      return res.status(404).json({
        status: "fail",
        error: "New Article not found",
      })

    }

  }

  catch (error) {
    res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports = {
  allnews,
  createArticle,
  deleteArticle,
  EditNewArticle,
};
