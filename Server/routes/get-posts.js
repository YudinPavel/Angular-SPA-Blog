const express = require("express");
// Подключаем модуль для роутинга
const router = express.Router();
// Подключаем схему поста
const Post = require("../models/PostSchema");

// Формируем ответ на get-запрос
router.get("*", function(request, response){

    // Ищем все посты в коллекции постов 
    return Post.find({}, function(err, docs){
        
        // Если ошибка - выводим ее в консоль и выходим из функции
        if(err){
            return console.log(err);
        }

        // Формируем ответ, посылая клиенту все найденные посты
        response.send(docs);
        
        // Конец запроса
        response.end();
    })

    
});

// Для того чтобы можно было использовать роут вне файла
module.exports = {
    router: router
};