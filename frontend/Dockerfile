FROM node:16.20.2

ENV WKDIR=/opt/react_app
WORKDIR ${WKDIR}

RUN npm -g i react-scripts@3.4.1
RUN npm -g i serve

COPY package*.json .

RUN npm ci

ENV PATH=${WKDIR}/node_modules/.bin:$PATH

COPY . .

CMD ["npm", "start"]
