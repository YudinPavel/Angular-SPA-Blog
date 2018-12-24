const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);


const app = express();

const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true }));

// Autentification test -------------------------------------------------
const config = require("./config/index");

app.use(session({
    store: new RedisStore({
        url: config.redisStore.url
    }),

    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
// End Autentification test --------------------------------------

mongoose.connect("mongodb://localhost:27017/blogdb", {useNewUrlParser: true}, function(err){
    if(err){
        return console.log(err);
    }

    app.listen(port, function(){
        console.log(`Server started on port ${port}`);
    })
});


//Запросы ---------------------------------------------------------------------

const user_data = require("./routes/user_data");
const registration = require("./routes/user_registration");
const signIn = require("./routes/user_sign-in");
const deleteAll = require("./routes/delete-all-user");
const lookAll = require("./routes/look-all-user");
const getPosts = require("./routes/get-posts");
const addPost = require("./routes/add-post");
const deleteAllPosts = require("./routes/delete-all-posts");
const searchUsers = require("./routes/get-users-by-name");
const searchUser = require("./routes/get-users-by-id");
const deletePost = require("./routes/delete-post");
const deleteUser = require("./routes/delete-user");
const getPostByEmail = require("./routes/get-posts-by-email");
const getPostById = require("./routes/get-post-by-id");

// app.use("/", user_data.router);
app.use("/registration", registration.router);
app.use("/signin", signIn.router);
app.use("/delete-all", deleteAll.router);
app.use("/look-all", lookAll.router);
app.use("/getposts", getPosts.router);
app.use("/addpost", addPost.router);
app.use("/deleteposts", deleteAllPosts.router);
app.use("/search", searchUsers.router);
app.use("/searchbyid", searchUser.router);
app.use("/deletepost", deletePost.router);
app.use("/deleteuser", deleteUser.router);
app.use("/getpostsbyemail", getPostByEmail.router);
app.use("/getpostbyid", getPostById.router);
//-----------------------------------------------------------------------------

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});