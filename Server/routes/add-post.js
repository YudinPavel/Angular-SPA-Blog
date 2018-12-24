const express = require('express');
const router = express.Router();

const Post = require('../models/PostSchema');

router.post("*", function(request, response) {
    
    console.log(request.body);

    const post = new Post(request.body);

    return post.save(function(err){
        if(err){
            return console.log(err);
        }
        
        response.end();
    });

});

module.exports = {
    router: router
};