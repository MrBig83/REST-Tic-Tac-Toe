const express = require("express");

const router = express.Router();
const cors = require("cors");
const app = require("../server");
const fs = require("fs");
const { format } = require("path");
const { fileURLToPath } = require("url");


router.use(cors());

router.get("/", function(req, res){
    res.send("Välkommen till /board.");
});


module.exports = router;