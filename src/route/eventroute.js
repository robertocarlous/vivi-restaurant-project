const express = require('express');
const router = express.Router();
//const { authUser } = require("../middleware/authuser");
const { createEvent, getAllEvent} = require("../controller/eventcontroller");

router.post('/create',  createEvent);
router.get('/get',  getAllEvent)

module.exports = {router};
