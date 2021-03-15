"use strict";

// eslint-disable-next-line import/no-unresolved
const express = require("express");
const morgan = require("morgan");
const controller = require("./src/controllers");

const app = express();

app.use(morgan("combined"));

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.disable("x-powered-by");

app.get("/record/:recordId", controller.getOne);
app.patch("/record/:recordId", controller.updateOne);

app.get("*", (req, res) => {
  res.status(400).send("Not found");
});

// // Error handler
// app.use((err, req, res) => {
//   console.error(err);
//   res.status(500).send("Internal Serverless Error");
// });

module.exports = app;
