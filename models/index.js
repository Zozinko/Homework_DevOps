const { Sequelize, DataTypes } = require('sequelize');

// Подключение к базе данных
const sequelize = new Sequelize('student_app', 'root', 'password', {
    host: 'localhost', // Замените на 'mariadb', если используете Docker
    dialect: 'mariadb',
    logging: false, // Отключить логи SQL-запросов
});

// Проверка подключения
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных успешно установлено.');
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
    }
})();

// Определение модели "Student"
const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    patronymic: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    groupNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'students',
    timestamps: false, // Отключение полей createdAt и updatedAt
});

// Синхронизация модели с базой данных
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Обновление структуры таблицы
        console.log('Модель синхронизирована с таблицей в базе данных.');
    } catch (error) {
        console.error('Ошибка синхронизации модели с таблицей:', error);
    }
})();

module.exports = {
    sequelize,
    Student,
};
