const express = require("express");
const router = express.Router();
const Post = require("../models/PostSchema");

router.get("*", function(request, response){

    
    return Post.find({}, function(err, docs){
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