"use strict";

const Joi = require("joi");

const yesNo = Joi.string().required().valid("yes", "no");
const yesNoNotSure = Joi.string().required().valid("yes", "no", "not-sure");
const unset = Joi.string().optional().valid("");

/**
 *
 * @param {any} body
 * @param {{ canBringPlusOne: boolean, askChildren: boolean }} options
 * @returns {import("../../../shared/types").FormData}
 */
exports.validateUpdateBody = (body, options) => {
  const schema = Joi.object()
    .keys({
      isComing: yesNoNotSure,
      plusOne: options.canBringPlusOne ? yesNoNotSure : unset,
      requiresAccommodation: yesNo,
      hasSpecialDietaryNeeds: yesNo,
      specialDietaryNeedsDesc: Joi.when("hasSpecialDietaryNeeds", {
        is: "yes",
        then: Joi.string().required(),
        otherwise: Joi.string().allow("").optional(),
      }),
      bringingChildren: options.askChildren ? yesNo : unset,
      childrenDesc: Joi.when("bringingChildren", {
        is: "yes",
        then: Joi.string().required(),
        otherwise: Joi.string().allow("").optional(),
      }),
      message: Joi.string().allow(""),
    })
    .required();

  const { error, value } = schema.validate(body, {
    allowUnknown: false,
    abortEarly: true,
  });
  if (error) {
    throw error;
  }

  return value;
};
