FROM node:22

ARG PORT

ENV PORT=${PORT:-3000}

WORKDIR /usr/src/app
COPY prisma ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start" ]
