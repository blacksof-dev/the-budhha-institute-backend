const path = require("path");
const testimonialContent = require("../models/testimonialContent");
const ErrorHandler = require("../utils/ErrorHandler");

const createContentTestimonial = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res
        .status(404)
        .json({ status: "fail", message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(404).send("Logo image is required");
    }

    const newdata = new testimonialContent({
      logo: req.file.path,
      title,
      desc,
    });
    await newdata.save();
    return res.status(200).json({ status: "success", message: newdata });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

const showContentTestimonial = async (req, res, next) => {
  try {
    const alldata = await testimonialContent.find();

    if (!alldata) {
      return next(new ErrorHandler("Something went wrong", 400));
    } else {
      return res.status(200).json({ status: "success", message: alldata });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

const editContentTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    // if (!title || !desc) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Title and Description are required.",
    //   });
    // }
    const updatedata = {
      title,
      desc,
    };
    if (req.file) {
      updatedata.logo = req.file.path;
    }
    const editdata = await testimonialContent.findByIdAndUpdate(
      id,
      updatedata,
      { new: true }
    );
    if (!editdata) {
      return res
        .status(404)
        .json({ status: "fail", message: "Testimonial not found" });
    }
    return res.status(200).json({ status: "success", message: editdata });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

const deleteContentTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteddata = await testimonialContent.findByIdAndDelete(id);

    if (!deleteddata) {
      return next(new ErrorHandler("Something went wrong", 400));
    } else {
      return res.status(200).json({ status: "success", message: deleteddata });
    }
  } catch (error) {
    return res.status(400).json({ message: "fail", message: error.message });
  }
};

module.exports = {
  createContentTestimonial,
  showContentTestimonial,
  editContentTestimonial,
  deleteContentTestimonial,
};
