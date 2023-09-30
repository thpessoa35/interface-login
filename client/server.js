const express = require('express');
const client = require('./db/db')
const path = require('path')
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const inializePassoport = require("./passportConfig");
const router = require('./routes')
const passport = require('passport')


inializePassoport(passport);

const port = 3000;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({extended: false }))
app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.disable('etag');
app.use(router)

app.listen(port, () => console.log('server in running'));
client.connect()    
  