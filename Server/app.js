// Подключаем фраемворк express 
const express = require("express");
// Подключаем библиотеку для парсинга json-файлов
const bodyParser = require("body-parser");
// Подключаем библиотеку cors для того, чтобы к серверу можно было обращаться со внешних адресов
const cors = require('cors');
// Подключаем mongoose - инструмент для работы с БД mongoDB
const mongoose = require("mongoose");
// Подключаем библиотеки для аутентификации пользователя и записи сессий 
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

// Главное приложение
const app = express();

// Порт, на котором будет работать сервер
const port = 3000;

// Разрешаем доступ к серверу для всех адресов
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


// Подключаем БД через модуль mongoose (он будет работать на порту 27017) и создаем базу данных, если ее нет
mongoose.connect("mongodb://localhost:27017/blogdb", {useNewUrlParser: true}, function(err){
    if(err){
        return console.log(err);
    }

    // Запускаем сервер 
    app.listen(port, function(){
        // Выводим в консоль сообщение о том что сервер успешно запущен
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
const editUser = require("./routes/edit-user");

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
app.use("/edituser", editUser.router);
//-----------------------------------------------------------------------------


// Остановка работы сервера 
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});