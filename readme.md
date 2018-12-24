Angular SPA Blog. 
v 0.0.1.

Реализовано: 
1. Регистрация пользователей.
2. Авторизация пользователей.
    2.1. Валидация по email, введенным данным и сложности пароля (сделана не лучшим образом).
3. Добавление постов.
    2.2. Пост состоит из текста и картинки(опционально). Картинка вставляется с помощью URL.
4. Удаление постов для автора поста и админа.
5. Удаление пользователя для админа.
6. Поиск по пользователям.
7. Адаптивный дизайн (ну или почти).
8. Защита от входа в приложение неавторизированных пользователей.
9. Защита от входа на страницы регистрации/логина авторизированных пользователей.

Что планируется реализовать:
1. Сделать форму регистрации через реактивные формы (чтобы можно было сравнить password и confirm password до отправки на сервер).
2. Реализовать редактирование постов (замену аватара пользователя).
3. Реализовать JWT (сейчас user просто сохраняется в cookies).
4. Добавление комментариев.
5. Добавление подписок и реализация разделения прав пользователей (пользователи видят только определенные посты).
6. "Более адаптивный дизайн".
7. Перенос некоторых данных в сервисы (например - сохранять некоторые данные об авторизированном пользователе не в cookies, а в сервисе).
8. Перенос некоторых элементов в отдельные компоненты (например - пост, кнопка "back" на страницах search и user page) . 