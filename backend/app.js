"use strict";

// eslint-disable-next-line import/no-unresolved
const express = require("express");
const airtable = require("./src/services/airtable.service");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("x-powered-by", "serverless-express");
  next();
});

app.disable("x-powered-by");

app.get("/record/:recordId", async (req, res) => {
  const { success, data, error } = await airtable.getRecord(
    req.params.recordId
  );
  if (success) {
    return res.json(data);
  }
  if (error && error.error === "NOT_FOUND") {
    return res.status(404).json(error);
  }
  return res.status(500).json(error);
});

app.get("*", (req, res) => {
  res.status(400).send("Not found");
});

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send("Internal Serverless Error");
});

module.exports = app;
