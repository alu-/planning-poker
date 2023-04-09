FROM node:18.15-alpine3.16

WORKDIR /app

COPY . ./

RUN npm install --no-fund --no-audit
RUN npm run build

CMD ["node", "index.js"]