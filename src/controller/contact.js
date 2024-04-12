const createContactModel = require("../models/contactmodel");

const createContact = async (req, res) => {
  try {
    const { firstName, lastName,  email, message} = req.body;

    const newContact = new createContactModel({ 
        firstName,
        lastName,
        email,
        message,
      
    });

    const savedContact = await newContact.save();
    res.status(200).json({
      status: "Success",
      message: "contact submitted successfully",
      data: savedContact,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


const getAllContact = async (req, res) => {
  try {
    const fetchAllContact = await createContactModel.find();

    res.status(200).json({ 
      status: "Success",
      message: "contact fetched successfully",
      data: fetchAllContact
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createContact, getAllContact}