// @ts-check

"use strict";

const airtable = require("../services/airtable.service");
const logger = require("../infra/logger");
const { airtableToSharedRecord } = require("../utils/record-transformer");

exports.getOneRecord = async function (req, res) {
  const { recordId } = req.params;
  try {
    logger.info("getting_one_record", { recordId });

    const airtableRecord = await airtable.getRecord(recordId);
    const sharedRecord = airtableToSharedRecord(airtableRecord);
    return res.json(sharedRecord);
  } catch (error) {
    logger.error("failed_to_get_one_record", { recordId, error });
    if (error && error.error === "NOT_FOUND") {
      return res.status(404).json(error);
    }
    return res.status(500).json(error);
  }
};
