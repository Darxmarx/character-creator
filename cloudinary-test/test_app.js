const createError = require('http-errors');
const express = require('express');
const path = require('path');

const signUploadWidgetRouter = require('./routes/signature-route');

const app = express()

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// upload widget signing api
app.use('./signuploadwidget', signUploadWidgetRouter);

// static files
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err:{}

    // render the error page
    res.status(err.status||500);
    res.render('error');
})

const port = process.evnt || 3000

app.listen(port, () => {
    console.info(`http://localhost:${port}`);
})