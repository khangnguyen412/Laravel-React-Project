# The source was set up by KhangNguyen — do not copy :)
# Source được setup bởi GPT và KhangNguyen, cấm cop dưới mọi hình thức :)

FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]