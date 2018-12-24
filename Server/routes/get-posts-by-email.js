const express = require("express");
const router = express.Router();
const Post = require("../models/PostSchema");

router.post("*", function(request, response){

    return Post.find({author: request.body.email}, function(err, docs){

        if(err){
            return console.log(err);
        }

        response.send(docs);
        
        response.end();
    })

    
});

module.exports = {
    router: router
};