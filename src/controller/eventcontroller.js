const createEventModel = require("../models/eventmodel");
//const UserModel = require("../models/usermodel");

const createEvent = async (req, res) => {
  try {
    const { fullName, email, mobile, noOfGuest, bookingType, date, time,specialRequest } = req.body;

    // const userId = req.user._id;

    // const user = await UserModel.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    const newEvent = new createEventModel({ 
        fullName,
        email,
        mobile,
        noOfGuest,
        bookingType,
        date,
        time,
        specialRequest,
    });

    const savedEvent = await newEvent.save();
    res.status(200).json({
      status: "Success",
      message: "Event submitted successfully",
      data: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


const getAllEvent = async (req, res) => {
  try {
    const fetchAllEvent = await createEventModel.find()

    res.status(200).json({ 
      status: "Success",
      message: "Events fetched successfully",
      data: fetchAllEvent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createEvent, getAllEvent };
