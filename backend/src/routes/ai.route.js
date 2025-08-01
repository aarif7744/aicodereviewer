// routes/ai.routes.js
const express = require('express');
const aicontroller = require("../controllers/ai.controller");
const router = express.Router();

router.post("/get-review", aicontroller.getReview); // ✅ Changed to POST

module.exports = router;
