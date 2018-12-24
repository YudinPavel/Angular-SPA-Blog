const express = require("express");
const router = express.Router();
const User = require('../models/UserSchema');

router.post("*", function(request, response){

    User.remove({_id: request.body._id}, function(err, doc){


        if(err){
            return console.log(err);
        }

        response.end();
    })

});

module.exports = {
    router: router
};