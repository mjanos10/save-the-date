// @ts-check

"use strict";

/**
 * @param {import('../../../shared/types').AirtableRecord} airtableRecord
 * @returns {import('../../../shared/types').SharedRecord}
 */
exports.airtableToSharedRecord = (airtableRecord) => {
  const people = [
    airtableRecord["Név1"],
    airtableRecord["Név2"],
    airtableRecord["Név3"],
    airtableRecord["Név4"],
    airtableRecord["Név5"],
  ].filter(Boolean);

  return {
    isComing: toYesNoUnsure(airtableRecord["Jön"]),
    people,
    peopleCount: people.length,
    canBringPlusOne: people.length === 1,
    askChildren: Boolean(airtableRecord["Gyerekes"]),
    multipleChildren: Boolean(airtableRecord["Több gyerekes"]),
    bringingChildren: toYesNo(airtableRecord["Hoz gyereket?"]),
    childrenDesc: airtableRecord["Gyerek leírás"],
    hasSpecialDietaryNeeds: toYesNo(airtableRecord["Kér spec. ételt?"]),
    message: airtableRecord["Üzenet"],
    plusOne: toYesNoUnsure(airtableRecord["Hoz +1-et?"]),
    requiresAccommodation: toYesNo(airtableRecord["Kér spec. ételt?"]),
    specialDietaryNeedsDesc: airtableRecord["Spec. étel kívánság"],
  };
};

/**
 * @param {import('../../../shared/types').FormData} sharedRecord
 * @returns {import('../../../shared/types').UpdatableAirtableRecord}
 */
exports.sharedToUpdatableAirtableRecord = (sharedRecord) => {
  return {
    Jön: fromYesNoUnsure(sharedRecord.isComing),
    "Hoz +1-et?": fromYesNoUnsure(sharedRecord.plusOne),
    "Hoz gyereket?": fromYesNo(sharedRecord.bringingChildren),
    "Gyerek leírás": sharedRecord.childrenDesc,
    "Kér szállást?": fromYesNo(sharedRecord.requiresAccommodation),
    "Kér spec. ételt?": fromYesNo(sharedRecord.hasSpecialDietaryNeeds),
    "Spec. étel kívánság": sharedRecord.specialDietaryNeedsDesc,
    Üzenet: sharedRecord.message,
  };
};

/**
 * @param {import('../../../shared/types').AirtableYesNo} field
 * @returns {import('../../../shared/types').FormYesNo}
 */
function toYesNo(field) {
  if (field === "igen") {
    return "yes";
  }
  if (field === "nem") {
    return "no";
  }
  return "";
}

/**
 * @param {import('../../../shared/types').FormYesNo} field
 * @returns {import('../../../shared/types').AirtableYesNo} field
 */
function fromYesNo(field) {
  if (field === "yes") {
    return "igen";
  }
  if (field === "no") {
    return "nem";
  }
  return "";
}

/**
 * @param {import('../../../shared/types').AirtableYesNoUnsure} field
 * @returns {import('../../../shared/types').FormYesNoUnsure}
 */
function toYesNoUnsure(field) {
  if (field === "igen") {
    return "yes";
  }
  if (field === "nem") {
    return "no";
  }
  if (field === "nem tudja") {
    return "not-sure";
  }
  // Empty string for not set value
  return "";
}

/**
 * @param {import('../../../shared/types').FormYesNoUnsure} field
 * @returns {import('../../../shared/types').AirtableYesNoUnsure} field
 */
function fromYesNoUnsure(field) {
  if (field === "yes") {
    return "igen";
  }
  if (field === "no") {
    return "nem";
  }
  if (field === "not-sure") {
    return "nem tudja";
  }
  return "";
}
