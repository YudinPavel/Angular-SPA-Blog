const express = require("express");
const router = express.Router();
const Post = require("../models/UserSchema");

router.post("*", function(request, response){

    Post.findOne({_id: request.body.id}, function(err, doc){
        if(err){
            return console.log(err);
        } 

        console.log(doc);

        response.send(doc);
        
        response.end();
    })

});

module.exports = {
    router: router
};