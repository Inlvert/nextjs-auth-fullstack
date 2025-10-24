# Вибираємо Node.js 22
FROM node:22.17.1

# Робоча директорія всередині контейнера
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код проекту
COPY . .

# Для production білду (опційно)
RUN npm run build

# Виставляємо порт
EXPOSE 3000

# Запуск dev сервера (для production: ["npm", "start"])
CMD ["npm", "run", "dev"]
