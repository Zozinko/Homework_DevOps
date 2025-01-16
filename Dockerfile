# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Копируем CSS в директорию /app/public
COPY style.css /app/public/

# Устанавливаем зависимости
RUN npm install
RUN npm install sequelize mariadb

# Копируем исходный код приложения
COPY . .

# Указываем порт, который будет использовать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]

# Запускаем сервер с обработкой статических файлов
CMD ["node", "app.js"]
