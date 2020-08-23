

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());


const posts  = {};

app.post("/events", (req, res) =>{

    
    const {type, data} = req.body;
    console.log(data);
        if(type === "PostCreated"){
            
            const {id, title, status} = data;
            posts[id] = {id, title, comments: []};
        }else if(type === "CommentCreated"){
            const {id, content, postId} = data;
            const post = posts[postId];
            post.comments.push({id, content, status});

        }
        console.log("got: ",posts);
        res.status(200).send("K");
});



app.get("/posts", (req, res) =>{

    res.send(posts)

});



app.listen(4002, () =>{
    console.log("listening on 4002");
});