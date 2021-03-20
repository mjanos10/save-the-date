// @ts-check

"use strict";

const airtable = require("../services/airtable.service");

const { successResponse, errorResponse } = require("../utils/http-response");
const { airtableToSharedRecord } = require("../utils/record-transformer");

const logger = require("../infra/logger");

exports.getOneRecord = async (evt, ctx) => {
  const { awsRequestId } = ctx;
  const { recordId } = evt.pathParameters;

  try {
    logger.info("new_event", {
      evt,
      awsRequestId,
      recordId: evt.pathParameters.recordId,
    });

    const airtableRecord = await airtable.getRecord(recordId);
    const sharedRecord = airtableToSharedRecord(airtableRecord);
    logger.info("successfully_transformed_record", { recordId, sharedRecord });
    return successResponse(sharedRecord, awsRequestId);
  } catch (error) {
    logger.error("failed_to_get_one_record", error);
    if (error && error.error === "NOT_FOUND") {
      return errorResponse(404, "Not Found", error, awsRequestId);
    }
    return errorResponse(500, "Unknown error", error, awsRequestId);
  }
};
