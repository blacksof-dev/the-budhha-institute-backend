const Awards = require("../models/AwardsModel");
const Errorhandler = require("../utils/ErrorHandler");

const allawards = async (req, res,next) => {

    try {
  
      const data = await Awards.find();
      if(!data){
        return next(new Errorhandler("Something went wrong"));
      }
      return res.status(200).json({
        status: "success",
        data: data,
      })
    }
  
    catch (error) {
      return res.status(404).json({
        status: "fail",
        error: error.message,
      })
    }
  
  };



  const createAwards = async (req, res) => {
    try {
  
      if (!req.file) {
        return res.status(400).send("Cover image is required.");
      }
      const {title,desc,year} = req.body;
      const data = new Awards({
        cover: req.file.path,
        title,
        desc,
        year,
      });
      await data.save();
      return res.status(201).json({
        status: "success",
        message:data
      });
    }
    catch (error) {
      return res.status(404).json({
        status: "fail",
        error: error.message,
      });
    }
  };
 
  
  const deleteAwards = async (req, res) => {

    try {
  
      const { id } = req.params;
  
      const deletedItem = await Awards.findByIdAndDelete(id);
  
      if (deletedItem) {
        return res.status(200).json({
          status: "success",
          data: deletedItem
        });
  
      }
  
      else {
  
        return res.status(404).json({
          status: "fail",
          error: "Something went wrong",
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


  const editawards = async (req, res) => {
    try {
  
      const { id } = req.params;
      const { title, desc,year } = req.body;
      const cover = req.file ? req.file.path : undefined;
  
      const updateData = {
        title: title,
         desc,
         year,
      };
  
      if (cover) {
        updateData.cover = cover;
      }
  
      const updateddata = await Awards.findByIdAndUpdate(id, updateData, {
        new: true, 
      });
  
      if (!updateddata) {
        return res.status(404).send("Something went wrong");
      }
  
      return res.status(200).json({
        status: "success",
        data: updateddata,
      });
  
    }
    catch (error) {
      return res.status(404).json({
        status: "fail",
        error: error.message,
      });
    }
  };

  module.exports = {
    allawards,
    createAwards,
    deleteAwards,
    editawards,
  }