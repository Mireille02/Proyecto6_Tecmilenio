
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
let exphbs = require('express-handlebars');
const flash = require('connect-flash');
const passport = require('passport');

//Initiliazation
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
