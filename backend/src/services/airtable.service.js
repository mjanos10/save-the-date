// @ts-check

"use strict";

const Airtable = require("airtable");
const logger = require("../infra/logger");

const tableName = process.env.AIRTABLE_TABLE_NAME;

/** @type {import('airtable/lib/table')} */
let client;

function getClient() {
  if (!client) {
    client = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
      endpointUrl: "https://api.airtable.com",
    }).base(process.env.AIRTABLE_BASE)(tableName);
  }
  return client;
}

/**
 * @param {string} id
 * @returns {Promise<import("../../../shared/types").AirtableRecord>}
 */
exports.getRecord = async function getRecord(id) {
  logger.info("sending_airtable_get_record_query", { id });
  const record = await getClient().find(id);
  logger.info("airtable_get_record_query_response", { id, record });
  return record.fields;
};

/**
 * @returns {Promise<import("../../../shared/types").AirtableRecord[]>}
 */
exports.getAll = async function getAll() {
  logger.info("getting_all_airtable_records");
  const records = await getClient().select().all();
  records.map((r) => r.fields);
  logger.info("got_all_airtable_records", { count: records.length });
  return records.map((r) => r.fields);
};

/**
 * @param {string} id
 * @param {import("../../../shared/types").UpdatableAirtableRecord} data
 * @returns {Promise<import("../../../shared/types").AirtableRecord>}
 */
exports.updateRecord = async function updateRecord(id, data) {
  logger.info("sending_airtable_update_record_request", { id, data });
  const record = await getClient().update(id, data);
  logger.info("airtable_record_update_response_arrived", { id, data, record });
  return record.fields;
};
