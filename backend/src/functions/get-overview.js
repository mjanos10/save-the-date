// @ts-check

"use strict";

const airtable = require("../services/airtable.service");

const { successResponse, errorResponse } = require("../utils/http-response");
const { airtableToSharedRecord } = require("../utils/record-transformer");

const logger = require("../infra/logger");
const { getPeople, getPeopleCount } = require("../utils/people");

exports.getOverview = async (evt, ctx) => {
  const { awsRequestId } = ctx;
  try {
    logger.info("new_overview_event", { evt, awsRequestId });

    const allRecords = await airtable.getAll();
    return successResponse(createOverview(allRecords), awsRequestId, false);
  } catch (error) {
    logger.error("failed_to_handle_overview", error);
    return errorResponse(500, "Unknown error", error, awsRequestId);
  }
};

/**
 * @param {import('../../../shared/types').AirtableRecord[]} records
 * @returns {any}
 */
function createOverview(records) {
  return `Összefoglaló
----------------------------
Várható vendégek száma: ${getComingCount(records)}
Plusz +1-ek száma: ${getPlusOneCount(records)}
Összes gyerekek szám: ${getAllChildrenCount(records)}
Gyerekek 0 és 5 év között: ${getBabyCount(records)}
Gyerekek 5 és 12 év között: ${getChildrenCount(records)}
`;
}

/**
 * @param {import('../../../shared/types').AirtableRecord[]} records
 * @returns {number}
 */
function getComingCount(records) {
  return records.reduce(
    (sum, record) => getComingCountForOneRecord(record) + sum,
    0
  );
}

/**
 * @param {import('../../../shared/types').AirtableRecord} record
 * @returns {number}
 */
function getComingCountForOneRecord(record) {
  if (!isComing(record)) {
    return 0;
  }
  if (record["Csak x-en jönnek"]) {
    return record["Csak x-en jönnek"];
  }
  const peopleCount = getPeopleCount(record);
  const plusOneCount = record["Hoz +1-et?"] === "igen" ? 1 : 0;
  return peopleCount + plusOneCount;
}

/**
 * @param {import('../../../shared/types').AirtableRecord[]} records
 * @returns {number}
 */
function getPlusOneCount(records) {
  return records
    .filter(isComing)
    .reduce(
      (sum, record) => (record["Hoz +1-et?"] === "igen" ? sum + 1 : sum),
      0
    );
}

/**
 * @param {import('../../../shared/types').AirtableRecord} record
 * @returns {boolean}
 */
function isComing(record) {
  return record["Jön"] === "igen";
}

/**
 * @param {import('../../../shared/types').AirtableRecord[]} records
 * @returns {number}
 */
function getAllChildrenCount(records) {
  return getChildrenCount(records) + getBabyCount(records);
}

/**
 * @param {import('../../../shared/types').AirtableRecord[]} records
 * @returns {number}
 */
function getChildrenCount(records) {
  return records
    .filter(isComing)
    .reduce((sum, r) => sum + (r["5-12 közti gyerekek száma"] || 0), 0);
}

/**
 * @param {import('../../../shared/types').AirtableRecord[]} records
 * @returns {number}
 */
function getBabyCount(records) {
  return records
    .filter(isComing)
    .reduce((sum, r) => sum + (r["5 év alatti gyerekek száma"] || 0), 0);
}
