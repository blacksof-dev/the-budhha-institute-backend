const Subtabs = require("../models/SubtabModel");

const Allsubtabs = async (req, res, next) => {
  try {
    const data = await Subtabs.find();

    if (!data) {
      return next(new ErrorHandler("Something went wrong", 400));
    }
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

const createAllsubtabs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Cover image is required.");
    }
    const { title, tab } = req.body;
    const datas = new Subtabs({
      images: req.file.path,
      title: title,
      tab: tab,
    });
    await datas.save();
    return res.status(201).json({
      status: "success",
      data: datas,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

const EditAllsubtabs = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const images = req.file ? req.file.path : undefined;

    const updateData = {
      title: title,
    };

    if (images) {
      updateData.images = images;
    }

    const updatedNews = await Subtabs.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedNews) {
      return res.status(404).send("Edited News not found");
    }

    return res.status(200).json({
      status: "success",
      data: updatedNews,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

const deleteAllsubtabs = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Subtabs.findByIdAndDelete(id);

    if (deletedItem) {
      return res.status(200).json({
        status: "success",
        data: deletedItem,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        error: "Subtabs not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports = {
  Allsubtabs,
  createAllsubtabs,
  EditAllsubtabs,
  deleteAllsubtabs,
};
