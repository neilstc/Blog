
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());



app.post("/events", (req, res) =>{
const event = req.body;
axios.post("http://localhost:4000/events", event);
axios.post("http://localhost:4001/events", event);
axios.post("http://localhost:4002/events", event);
res.status({status: "OK"});

});


app.listen(4005, () =>{
    console.log("broker listening on 4005");
});


