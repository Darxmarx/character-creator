const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const createError = require('http-errors');

// const signuploadwidgetRouter = require('./controllers/api/widget-sign-route');

const routes = require('./controllers');
const sequelize = require('./config/connection');

// todo: change helpers later on
const helpers = require('./utils/auth');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

// upload signing using api
// app.use('/api/signuploadwidgetRouter', signuploadwidgetRouter);

// app.use((req, res, next) => {
//     next(createError(404))
// })


const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};


app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// error handler
// app.use((err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}

//     // render the error page
//     res.status(err.status || 500)
//     res.render('error')
// })

// const dothis = async function(){try { 
//     const response = await fetch('/api/signuploadwidgetRouter');
//     console.log(response.json());
// } catch (err) {
//     console.log(err)
// }}
// dothis();

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to ${PORT}!`));
});