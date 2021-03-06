"use strict";

const Airtable = require("airtable");
const logger = require("../infra/logger");

const client = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_BASE);

async function getRecord(id) {
  try {
    logger.info("getting_record_with_id", { id });
    const record = await client("DataTable").find(id);
    logger.info("successfully_got_record_with_id", { id, record });

    return { success: true, data: transformRecord(record) };
  } catch (error) {
    logger.error("failed_to_get_record_with_id", { id, error });
    return { success: false, error };
  }
}

function transformRecord(record) {
  const people = [
    record.fields["Név1"],
    record.fields["Név2"],
    record.fields["Név3"],
    record.fields["Név4"],
    record.fields["Név5"],
  ].filter(Boolean);

  return {
    isComing: getIsComing(record),
    people,
    canBringPlusOne: people.length === 1,
    askChildren: Boolean(record.fields["Gyerek kérdés"]),
    multipleChildren: Boolean(record.fields["Több gyerekes"]),
    children: record.fields["Gyerekek"],
  };
}

function getIsComing(record) {
  if (record.fields["Jön"] === "igen") {
    return "yes";
  }
  if (record.fields["Jön"] === "nem") {
    return "no";
  }
  if (record.fields["Jön"] === "nem tudja") {
    return "unsure";
  }
  // Empty string for not set value
  return "";
}

module.exports = {
  getRecord,
};
