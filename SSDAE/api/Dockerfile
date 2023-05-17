FROM node

RUN npm install -g nodemon

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

# RUN npx prisma migrate dev

# RUN npx prisma db seed

EXPOSE 3000

CMD ["npm", "run", "start"]