const Address = require("../models/AddressModel");
const connection = require("../utils/connection");
const dummyContactData = [
  
    {
     
      "cover":"/Home/resources/newsletter-2.png" ,
      "title": "The Buddha Times | Oct 2024-Jan 2025",
      "description": "Unveiling stories of change, collectively driven by communities, Fellows, Mentors and Anchors.",
      "targetpdf":"/Home/resources/newsletter-4.pdf",
    },
    {
     
      "cover":"/Home/resources/newsletter-2.png",
      "title": "The Buddha Times | Special Edition: Jul 2024",
      "description":"A peek into the Mentors’ Circle meeting, new Buddha Fellow Cohort orientation camp and more",
      "targetpdf": "/Home/resources/newsMedia2.pdf",
    },
   
    
    {
    
      "cover": "/Home/resources/newsletter-3.png",
      "title":"The Buddha Times | Oct-Dec 2023",
     "description": "Closing 2023 on a high with a bagful of positive takeaways",
      "targetpdf":"/Home/resources/newsMedia3.pdf",
    },
]
      
  const insertData = async (req,res) => {
    try {    
      await connection();
      await Address.insertMany(dummyContactData);
      // console.log("Data inserted successfully!");
    }   
    catch (error) {
      // console.log(error.message);
    }
  };
  
  insertData();

module.exports = dummyContactData;



