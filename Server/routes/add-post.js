const express = require('express');
const router = express.Router();

const Post = require('../models/PostSchema');

router.post("*", function(request, response) {
    
    console.log(request.body);

    const post = new Post(request.body);

    if(request.body._id){
        return Post.findOneAndUpdate(
            {_id: request.body._id},
            {$set: {
                text: request.body.text,
                img: request.body.img,
                comments: request.body.comments
            }},
            function(err, doc) {
                if(err){
                    return console.log(err);
                }

                response.end();
            }
        )
    }

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