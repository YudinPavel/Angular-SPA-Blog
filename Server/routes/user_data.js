'use strict';

var express = require('express');
var router = express.Router();

router.all("*", function(req, res, next){

    req.data = { user: { username: "SomeUser", roles: ["user", "admin"]}};

    next();

    response.end();
});

module.exports = {
    router: router
};