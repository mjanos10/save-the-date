// @ts-check

"use strict";

const Joi = require("joi");
const airtable = require("../services/airtable.service");
const logger = require("../infra/logger");
const {
  airtableToSharedRecord,
  sharedToUpdatableAirtableRecord,
} = require("../utils/record-transformer");
const { validateUpdateBody } = require("../validators/update-validator");

exports.updateRecord = async function (req, res) {
  const { recordId } = req.params;
  try {
    logger.info("updating_record_start", { recordId, body: req.body });

    const foundRecord = await airtable.getRecord(recordId);
    logger.info("found_airtable_record_for_update", { recordId, foundRecord });
    const sharedRecord = airtableToSharedRecord(foundRecord);

    logger.info("converted_airtable_record_for_update_validation", {
      recordId,
      sharedRecord,
    });

    const validatedBody = validateUpdateBody(req.body, sharedRecord);

    logger.info("update_request_body_is_valid", {
      recordId,
      body: validatedBody,
    });

    const updateData = sharedToUpdatableAirtableRecord(validatedBody);

    logger.info("converted_update_data_to_airtable_record_for_update", {
      recordId,
      updateData,
    });

    const updatedRecord = await airtable.updateRecord(recordId, updateData);
    const updatedSharedRecord = airtableToSharedRecord(updatedRecord);

    logger.info("responding_with_updated_record", {
      recordId,
      updatedSharedRecord,
    });

    return res.json(sharedRecord);
  } catch (error) {
    logger.error("failed_to_update_one_record", { recordId, error });
    if (error && Joi.isError(error)) {
      return res.status(400).json(error);
    }
    if (error && error.error === "NOT_FOUND") {
      return res.status(404).json(error);
    }
    return res.status(500).json(error);
  }
};
