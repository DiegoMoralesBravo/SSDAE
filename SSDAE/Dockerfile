FROM node

RUN npm install -g nodemon

WORKDIR /ssdae

RUN mkdir app

RUN mkdir api

RUN cd app

COPY /app/package.json .

RUN npm install

COPY /app. .

RUN npm run dev

RUN cd ../api

COPY /api/package.json .

RUN npm install

COPY ./api .

RUN npx prisma generate

EXPOSE 5173

EXPOSE 3000

CMD ["npm", "run", "start"]