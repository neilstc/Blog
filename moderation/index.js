const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();
app.use(bodyParser.json());









app.post("/events", (req, res) => {

    
});

app.listen(4003, (req, res) =>{
    console.log("listening on 4003")
});