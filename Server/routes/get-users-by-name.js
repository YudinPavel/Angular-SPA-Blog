const express = require("express");
const router = express.Router();
const Post = require("../models/UserSchema");

router.post("*", function(request, response){

    Post.find({name: {$regex: request.body.name}}, function(err, docs){
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