const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
     title:{
        type:String,
        required:[true,'Title is required'],
        minlength: [3, "Full name should be at least 3 characters long"],
        maxlength: [50, "Full name should not exceed 50 characters"]
     },

     email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
         match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*$/, "Please enter a valid email address"],
    },
     
    location:{
        type:String,
        required:[true,'location is required'],
        minlength: [3, "Location should be at least 3 characters long"],
        maxlength: [500, "Location should not exceed 500 characters"] 
    },

    MapLink: [{
        type: String,
        match:[/^https?:\/\/(www\.)?google\.[a-z]+\/maps\/(place|dir|search)?\/?.+/,  "Please enter a valid Google Maps link"]

    }]
    
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;