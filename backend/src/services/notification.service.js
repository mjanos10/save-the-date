"use strict";

const SNS = require("aws-sdk/clients/sns");
const logger = require("../infra/logger");

const sns = new SNS();

exports.emitEvent = async (recordId, airtableRecord) => {
  try {
    logger.info("emitting_sns_event", {
      recordId,
      airtableRecord,
    });
    const response = await sns
      .publish({
        TopicArn: process.env.SAVE_THE_DATE_SUBMITTED_TOPIC_ARN,
        Message: JSON.stringify(airtableRecord),
      })
      .promise();
    logger.info("successfully_emitted_sns_event", {
      recordId,
      airtableRecord,
      response,
    });
  } catch (error) {
    logger.info("failed_to_submit_sns_event", {
      recordId,
      airtableRecord,
      error,
    });
  }
};
