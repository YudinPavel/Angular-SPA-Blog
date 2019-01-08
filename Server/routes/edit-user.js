const express = require("express");
const router = express.Router();
const User = require('../models/UserSchema');

router.post("*", function(request, response){

    User.findOneAndUpdate(
        {_id: request.body._id},
        {$set: {
            name: request.body.name,
            surname: request.body.surname,
            email: request.body.email,
            password: request.body.password,
            img: request.body.img,
        }}, 
        function(err, doc){

        if(err){
            return console.log(err);
        }
        
        console.log(doc);

        response.end();

    })

});

module.exports = {
    router: router
};