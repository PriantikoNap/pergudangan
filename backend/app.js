var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var pool = require('./db')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var stockRouter = require('./routes/stock')
var customerRouter = require('./routes/pelanggan')
var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/stock', stockRouter)
app.use('/pelanggan', customerRouter)

module.exports = app
