// app empieza a utilizar las libererias de express,
// cookieparser, morgan, path, para darle sentido
// a nuestra aplicación y generar una estructura
// llamada estructura de middleware
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// midleware de enrutamiento que nos ayuda a definir
// el modelo rest al definir que si viene tal método 
 // y tal dirección ejecute una acción
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// creamos una aplicación express en blanco
const app = express();

// view engine setup
// en la carpeta views estará el motor de templates 
// y se va a usar pug como el motor de tampplates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// midleware de terceros
// looger en modo dev que es una librería que se 
// llama morgan que es un manejador de logs
app.use(logger('dev'));
// Vamos a usar la fución express.json para que todo lo que 
// recivamos se organize en forma de json
app.use(express.json());
// Usa urlencoded para que todos los formularios que vienen 
// como peticiones codifocados los pueda leer
app.use(express.urlencoded({ extended: false }));
// Organiza las cookies en una variable
app.use(cookieParser());
// midleware de recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// midleware de aplicación
// Cando es slash, manda a llamar indexRouter 
app.use('/', indexRouter);
// cuando es /user.... lo manda a usersRouter
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
