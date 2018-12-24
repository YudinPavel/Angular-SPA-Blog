const express = require("express");

const router = express.Router();

const User = require('../models/UserSchema');

router.post("*", function(request, response){

    User.findOne({email: request.body.email, password: request.body.password}, function(err, doc){
        if(err){
            return console.log(err);
        }

        if(!doc){
            response.send({'email' : ''});
        }
        else{
            response.send(doc);
            
        }

        response.end();
    })

});

module.exports = {
    router: router
};