const express = require("express");
const router = express.Router();
const Post = require('../models/PostSchema');

router.post("*", function(request, response){

    Post.remove({_id: request.body.id}, function(err, doc){

        console.log(request.body.id);

        if(err){
            return console.log(err);
        }

        response.end();
    })

});

module.exports = {
    router: router
};