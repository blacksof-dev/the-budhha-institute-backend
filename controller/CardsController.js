const CardModel = require("../models/CardsModel");
const CreateCards = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, designation, linkedinLink, role, address,fulldesc } = req.body;

    
    if (!req.file) {
      return res.status(400).send("Cover image is required.");
    }

    if (!fullName || !role) {
      return res
        .status(400)
        .json({ status: "fail", message: "FullName and Role is important" });
    }

    const newCardData = new CardModel({
      cover: req.file.path,
      fullName,
      designation,
      linkedinLink,
      address,
      role,
      fulldesc,
    });

    await newCardData.save();
    return res.status(200).json({ status: "success", data: newCardData });
  } catch (error) {
    return res.status(404).json({ status: "fail", error: error.message });
  }
};

const DeleteCards = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedata = await CardModel.findByIdAndDelete(id);
    if (!deletedata) {
      return res
        .status(400)
        .json({ status: "fail", error: "Deleted data not found" });
    } else {
      return res.status(200).json({ status: "success", data: deletedata });
    }
  } catch (error) {
    return res.status(404).json({ status: "fail", error: error.message });
  }
};

const ShowCards = async (req, res) => {
  try {
    const role = req.query.role;
    const datas = await CardModel.find();
    if (datas) {
      if (role) {
        const filteredData = datas.filter((item) => item.role === role);
        return res.status(200).json({ status: "success", data: filteredData });
      } else {
        return res.status(200).json({ status: "success", data: datas });
      }
    } else {
      return res.status(404).json({ status: "fail", error: "Data Not found" });
    }
  } catch (error) {
    return res.status(404).json({ status: "fail", error: error.message });
  }
};

const EditCards = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, designation, linkedinLink, address, role,fulldesc } = req.body;
    const cover = req.file ? req.file.path : undefined;

    const updateData = {
      fullName: fullName,
      designation: designation,
      linkedinLink: linkedinLink,
      address: address,
      role: role,
      fulldesc
    };

    if (cover) {
      updateData.cover = cover;
    }

    const updateddata = await CardModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateddata) {
      return res.status(404).send("Edited Data not found");
    }

    return res.status(200).json({
      status: "success",
      data: updateddata,
    });
  } catch (error) {
    return res.status(404).json({ status: "fail", error: error.message });
  }
};

module.exports = {
  CreateCards,
  DeleteCards,
  ShowCards,
  EditCards,
};
