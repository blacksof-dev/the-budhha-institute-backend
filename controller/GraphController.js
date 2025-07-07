const Graph = require("../models/GraphModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Subtabs = require("../models/SubtabModel");


const CreateGraphData = async (req, res) => {
  try {
    const data = new Graph({
      tabName: req.body.tabName,
      desc: req.body.desc,
      graphdetails: req.body.graphdetails, 
    });

    await data.save();

    res.status(201).json({
      success: true,
      message: "Graph data created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};



const EditGraphData = async (req, res) => {
  try {

    const {id} = req.params;
    console.log(id);
    const {tabName,desc,graphdetails} = req.body;

    const updatedData = {
      tabName,
      desc,
      graphdetails,
    }

    const data = await Graph.findByIdAndUpdate(id,updatedData,{new:true});
    
    if(!data){
      return res.status(404).json({success: false,message: "Graph data not found"});
    }
    res.status(200).json({success: true,message: "Graph data updated successfully",data:  updatedData }); 
  }
  
  catch (error) {
    console.error("Error updating graph data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const showGraphData = async (req, res, next) => {
  try {

    const graphs = await Graph.find().populate("subtabs");

    if (!graphs) {
        return next(new ErrorHandler("Something went wrong", 400));
    }
    return res.status(200).json({ status: "success", graphs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const DeleteGraphData = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await Graph.findByIdAndDelete(id);
    if (!data) {
      return next(new ErrorHandler("Something went wrong", 400));
    } else {
      return res.status(200).json({ status: "success", message: data });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  CreateGraphData,
  showGraphData,
  DeleteGraphData,
  EditGraphData,
};
