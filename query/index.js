



// This script saves all comment and posts to a single source and sending the data for client.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const axios = require("axios");


const posts  = {};

const handleEvent = (type, data) =>{


    console.log(type);
        if(type === "PostCreated"){
            
            const {id, title, status} = data;
            posts[id] = {id, title, comments: []};
        }else if(type === "CommentCreated"){
            const {id, content, postId, status} = data;
            const post = posts[postId];
            post.comments.push({id, content, status});

        }else if (type === "CommentUpdated"){
            const {id, content, postId, status} = data;
            const post = posts[postId];
            const comment = posts.comments.find( c => c.id === id);
            comment.status = status;
            comment.content = content;
        }
        res.status(200).send("K");
}

app.post("/events", (req, res) =>{


         const {type, data} = req.body;
         handleEvent(type, data);
        res.status(200).send("K");
});



app.get("/posts", (req, res) =>{

    res.send(posts)

});



 app.listen(4002, async () =>{
    console.log("listening on 4002");
    const res = await axios.get("http://event-bus-srv:4005/events");
    for(let event of res.data){
        console.log("processing . . . . ", event.type);
        handleEvent(event.type, event.data);
    }
});