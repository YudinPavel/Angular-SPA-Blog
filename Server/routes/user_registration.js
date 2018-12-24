'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/UserSchema');

router.post("*", function(request, response) {
    User.findOne({email: request.body.email}, function(err,doc){
        let message;
        let done;

        if(err){
            return console.log(err)
        }

        if(!doc){
            const user = new User(request.body);
            console.log(user);
            user.save(function(err){
                if(err){
                    return console.log(err);
                }
                console.log("Object saved", user);
            });
            response.send({message: "you have successfully registered!"});
            // done = true;
        } 
        else{
            //done = false;
            response.send({message: "Email is already registered. If you forgot your password, today is not your day."});
        }
    })
});

module.exports = {
    router: router
};