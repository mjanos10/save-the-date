// @ts-check

"use strict";

const Airtable = require("airtable");
const logger = require("../infra/logger");

const client = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_BASE);

/**
 * @param {string} id
 * @returns {Promise<import("../../../shared/types").AirtableRecord>}
 */
exports.getRecord = async function getRecord(id) {
  logger.info("sending_airtable_get_record_query", { id });
  const record = await client("DataTable").find(id);
  logger.info("airtable_get_record_query_response", { id, record });
  return record.fields;
};

/**
 * @param {string} id
 * @param {import("../../../shared/types").UpdatableAirtableRecord} data
 * @returns {Promise<import("../../../shared/types").AirtableRecord>}
 */
exports.updateRecord = async function updateRecord(id, data) {
  logger.info("sending_airtable_update_record_request", { id, data });
  const record = await client("DataTable").update(id, data);
  logger.info("airtable_record_update_response_arrived", { id, data, record });
  return record.fields;
};
