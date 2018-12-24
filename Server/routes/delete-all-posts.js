const express = require("express");
const router = express.Router();
const Post = require('../models/PostSchema');

router.get("*", function(request,response){
    Post.remove({}, function(err, res){
        console.log(res);
    });

    response.end();
}) 

module.exports = {
    router: router
};