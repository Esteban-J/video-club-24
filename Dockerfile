FROM node
WORKDIR /app
COPY . .
RUN nmp install
EXPOSE 80
CMD PORT=80 npm start