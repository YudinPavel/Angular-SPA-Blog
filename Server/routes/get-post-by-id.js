const express = require("express");
const router = express.Router();
const Post = require("../models/PostSchema");

router.post("*", function(request, response){

    
    return Post.findOne({_id: request.body.id}, function(err, doc){
        if(err){
            return console.log(err);
        }

        response.send(doc);
        
        response.end();
    })

    
});

module.exports = {
    router: router
};