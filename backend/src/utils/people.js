// @ts-check

"use strict";

/**
 * @param {import('../../../shared/types').AirtableRecord} record
 * @returns {string[]}
 */
const getPeople = (record) => {
  const people = [
    record["Név1"],
    record["Név2"],
    record["Név3"],
    record["Név4"],
    record["Név5"],
  ].filter(Boolean);

  return people;
};

exports.getPeople = getPeople;

/**
 * @param {import('../../../shared/types').AirtableRecord} record
 * @returns {number}
 */
function getPeopleCount(record) {
  return getPeople(record).length;
}

exports.getPeopleCount = getPeopleCount;
