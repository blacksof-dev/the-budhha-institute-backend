const Address = require("../models/AddressModel");

const StoreAddress = async (req, res) => {
    try {
        const newaddress = new Address({
            title: req.body.title,
            email: req.body.email,
            location: req.body.location,
            MapLink: req.body.MapLink,
        })

        await newaddress.save();
        return res.status(200).json({
            status: "success",
            data: newaddress
        });

    }
    catch (error) {
        return res.status(404).json({
            status: 'fail',
            error: error.message
        });
    }
}

const ShowAllAddress = async (req, res) => {
    try {
        const alladdress = await Address.find();
        return res.status(200).json({
            status: "success",
            data: alladdress,
        });

    }
    catch (error) {
        return res.status(404).json({
            status: 'fail',
            error: error.message
        });
    }
}

const EditAllAddress = async (req, res) => {

    try {

        const { id } = req.params;
        const { title, email, location, MapLink } = req.body;

        const editeddata = await Address.findByIdAndUpdate(id);

        if (!editeddata) {
            return res.status(400).json({
                status: "fail",
                error: "Not found id"
            });
        }

        editeddata.title = title || editeddata.title;
        editeddata.email = email || editeddata.email;
        editeddata.location = location || editeddata.location;
        editeddata.MapLink = MapLink || editeddata.MapLink;

        await editeddata.save();

        return res.status(200).json({
            status: "success",
            data: editeddata,
        });

    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            error: error.message
        });
    }
};


const DeleteAllAddress = async (req, res) => {
    try {

        const { id } = req.params;
        const deletedaddress = await Address.findByIdAndDelete(id);
        return res.status(200).json({
            status: "success",
            data: deletedaddress,
        });
    }

    catch (error) {
        return res.status(404).json({
            status: 'fail',
            error: error.message
        })
    }
}




module.exports = {
    StoreAddress,
    ShowAllAddress,
    DeleteAllAddress,
    EditAllAddress
}