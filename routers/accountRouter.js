const express = require("express");
const accountRouter = new express.Router();

accountRouter.get("/", (req, res) => {
    res.send('hello from account router')
});

module.exports = accountRouter;
