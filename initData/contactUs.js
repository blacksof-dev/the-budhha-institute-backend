const CsoNetwork = require("../models/CsoModel");
const connection = require("../utils/connection");
const dummyContactData = [
 {
  "logo":"https://png.pngtree.com/png-vector/20240426/ourmid/pngtree-joy-on-four-paws-the-pitbull-puppy-spreading-happiness-png-image_12332512.png",
  "desc":"sadszckxdlvfkdvog",
 },
 {
  "logo":"https://png.pngtree.com/png-vector/20240426/ourmid/pngtree-joy-on-four-paws-the-pitbull-puppy-spreading-happiness-png-image_12332512.png",
  "desc":"sadszckxdlvfkdvog",
 },

 {
  "logo":"https://png.pngtree.com/png-vector/20240426/ourmid/pngtree-joy-on-four-paws-the-pitbull-puppy-spreading-happiness-png-image_12332512.png",
  "desc":"sadszckxdlvfkdvog",
 },

  ]
  

  const insertData = async (req,res) => {
    try {    
      await connection();
      await CsoNetwork.insertMany(dummyContactData);
      // console.log("Data inserted successfully!");
    }   
    catch (error) {
      // console.log(error.message);
    }
  };
  
  insertData();

module.exports = dummyContactData;



