const express = require('express');
const router = express.Router();
const { createContact, getAllContact } = require("../controller/contact");

router.post('/',  createContact);
router.get('/', getAllContact)

module.exports = {router};
