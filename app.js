// Импортируем необходимые модули
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes} = require('sequelize');

// Создаем приложение Express
const app = express();
const PORT = 3000;

//подключение к бд
var sequelize; 

// Middleware для обработки данных форм 123S
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*app.get('/initDB',async (req, res) => {
    sequelize = new Sequelize('HomeworkDevOps', 'root', 'password', {
        host: 'mariadb',
        dialect: 'mariadb' });
    //авторизация бд
    await sequelize.authenticate();

    const User = sequelize.define(
        'User',
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,

            },
            lastName: {
                type: DataTypes.STRING,

            },
            patronymic: {
                type: DataTypes.STRING,

            },
            groupNumber: {
                type: DataTypes.STRING,

            },
            courseNumber: {
                type: DataTypes.INTEGER,

            },
        },
        {
            
        }
    );

    await sequelize.sync ({
        force:true
    })
})
*/

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Форма студента</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Введите данные студента</h1>
                <form action="/result" method="POST">
                    <label for="lastName">Фамилия:</label>
                    <input type="text" id="lastName" name="lastName" required>

                    <label for="firstName">Имя:</label>
                    <input type="text" id="firstName" name="firstName" required>

                    <label for="patronymic">Отчество:</label>
                    <input type="text" id="patronymic" name="patronymic" required>

                    <label for="groupNumber">Номер группы:</label>
                    <input type="text" id="groupNumber" name="groupNumber" placeholder="НМТ-413901" required>

                    <button type="submit">Отправить</button>
                </form>
                <div class="result">
                    <p>Результат:</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.post('/result', async(req, res) => {
    const { firstName, lastName, patronymic, groupNumber } = req.body;

    // Проверяем валидность формата номера группы
    if (!/^[A-Za-zА-Яа-я0-9-]+$/.test(groupNumber)) {
        return res.send('<h1>Ошибка: Неверный формат номера группы.</h1>');
    }

    // Ищем первую цифру в номере группы
    const firstDigitMatch = groupNumber.match(/\d/); // Ищет первую цифру в строке

    if (!firstDigitMatch) {
        return res.send('<h1>Ошибка: Номер группы должен содержать хотя бы одну цифру.</h1>');
    }

    const course = parseInt(firstDigitMatch[0], 10); // Преобразуем найденную цифру в число

 /*   // создал объект с даными из рекуест боди
    const newUser = {
        lastName, 
        firstName,
        patronymic,
        groupNumber,
        courseNumber: course
    }

    //записали в бд
    const newDBUser = await User.create(newUser);
*/
    res.send(`
        <h1>Результаты</h1>
        <p>ФИО: ${lastName} ${firstName} ${patronymic}</p>
        <p>Номер группы: ${groupNumber}</p>
        <p>Курс: ${course}</p>
    `);
});

//вытаскивание данных
app.get('/getUsers', async(req, res)=>{
    const users = User.findAll();
    res.send(JSON.stringify(users));
}
)



// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
