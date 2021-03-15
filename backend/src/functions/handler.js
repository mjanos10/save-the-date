// @ts-check

"use strict";

const Joi = require("joi");
const airtable = require("../services/airtable.service");
const notification = require("../services/notification.service");

const logger = require("../infra/logger");

const {
  airtableToSharedRecord,
  sharedToUpdatableAirtableRecord,
} = require("../utils/record-transformer");
const { validateUpdateBody } = require("../validators/update-validator");

exports.getOneRecord = async (evt, ctx) => {
  const { recordId } = evt.pathParameters;
  try {
    logger.info("new_event", {
      evt,
      awsMessageId: ctx.awsMessageId,
      recordId: evt.pathParameters.recordId,
    });

    const airtableRecord = await airtable.getRecord(recordId);
    const sharedRecord = airtableToSharedRecord(airtableRecord);
    logger.info("successfully_transformed_record", { recordId, sharedRecord });
    return successResponse(sharedRecord);
  } catch (error) {
    console.error(error);
    logger.error("failed_to_get_one_record", error);
    if (error && error.error === "NOT_FOUND") {
      return errorResponse(404, "Not Found", error);
    }
    return errorResponse(500, "Unknown error", error);
  }
};

exports.updateOneRecord = async (evt, ctx) => {
  const { recordId } = evt.pathParameters;
  try {
    logger.info("new_update_event", {
      evt,
      awsMessageId: ctx.awsMessageId,
      recordId: evt.pathParameters.recordId,
    });

    const foundRecord = await airtable.getRecord(recordId);
    logger.info("found_airtable_record_for_update", { recordId, foundRecord });
    const sharedRecord = airtableToSharedRecord(foundRecord);

    logger.info("converted_airtable_record_for_update_validation", {
      recordId,
      sharedRecord,
    });

    const validatedBody = validateUpdateBody(evt.body, sharedRecord);

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

    await notification.emitEvent(recordId, foundRecord["Ismertető"]);

    return successResponse(sharedRecord);
  } catch (error) {
    logger.error("failed_to_update_one_record", { recordId, error });
    if (error && Joi.isError(error)) {
      return errorResponse(400, "Bad Request", error);
    }
    if (error && error.error === "NOT_FOUND") {
      return errorResponse(404, "Not Found", error);
    }
    return errorResponse(500, "Unknown error", error);
  }
};

function successResponse(body) {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
}

function errorResponse(status, message, body) {
  return {
    statusCode: status,
    message,
    body: JSON.stringify(body),
  };
}
