const NewsLetter = require("../models/NewsLetterModel");

const CreateNewsLetter = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email && !name) {
      return res
        .status(400)
        .json({ status: "fail", message: "Please provide Email" });
    }

    const newemail = new NewsLetter({
      email,
      name,
    });

    await newemail.save();

    return res.status(200).json({ status: "success", message: newemail });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

const ShowNewsLetter = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Page and limit must be greater than 0",
      });
    }

    const skip = (page - 1) * limit;
    const allnews = await NewsLetter.find().skip(skip).limit(limit);
    const total = await NewsLetter.countDocuments();

    return res.status(200).json({
      status: "success",
      message: allnews,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

const DeleteNewsLetter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await NewsLetter.findByIdAndDelete(id);

    if (!data) {
      return next(new ErrorHandler("Something went wrong", 400));
    } else {
      return res.status(200).json({ status: "success", message: data });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.mesage });
  }
};

const DeleteAllNewsLetter = async (req, res, next) => {
  try {
    const allnewsletter = await NewsLetter.deleteMany();
    if (!allnewsletter) {
      return next(new ErrorHandler("Something went wrong", 400));
    } else {
      return res
        .status(200)
        .json({ status: "success", message: allnewsletter });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
module.exports = {
  CreateNewsLetter,
  ShowNewsLetter,
  DeleteNewsLetter,
  DeleteAllNewsLetter,
};
