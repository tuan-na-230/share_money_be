require("dotenv").config();
require("./connect-mongodb");
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const accountRouter = require('./routers/accountRouter')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(bodyParser.json());

//router
app.get('/', (req, res) => {
    res.send('hello from server')
})
app.use('/api/v1/account', accountRouter);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
});

app.listen(PORT, (err) => {
    err
        ? console.error(err.message)
        : console.log(`Server listening on port ${PORT}`)
})