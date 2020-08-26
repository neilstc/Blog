
// self made event bus (totally for me to undrestand hows that work.)


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
app.use(bodyParser.json());
const events = [];

app.post("/events", (req, res) =>{
const event = req.body;
events.push(event);
axios.post("http://posts-srv:4000/events", event);
axios.post("http://comments-srv:4001/events", event);
axios.post("http://query-serv:4002/events", event);
axios.post("http://moderation-serv:4003/events", event);
res.status({status: "OK"});

});

app.get("/events", (req, res) =>{
    res.send(events);
});


app.listen(4005, () =>{
    console.log("broker listening on 4005");
});


