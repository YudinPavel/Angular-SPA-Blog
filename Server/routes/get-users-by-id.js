const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

router.post("*", function(request, response){

    User.findOne({_id: request.body.id}, function(err, doc){
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