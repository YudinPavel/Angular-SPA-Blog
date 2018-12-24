const express = require("express");

const router = express.Router();

const User = require('../models/UserSchema');

router.get("*", function(request,response){
    User.find({}, function(err, docs){
        console.log(docs);
    });

    response.end();
})

module.exports = {
    router: router
};