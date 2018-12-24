const express = require("express");

const router = express.Router();

const User = require('../models/UserSchema');

router.get("*", function(request,response){
    User.remove({}, function(err, res){
        console.log(res);
    });

    response.end();
}) 

module.exports = {
    router: router
};