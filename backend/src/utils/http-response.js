"use strict";

function successResponse(body, messageId, useJson = true) {
  return {
    statusCode: 200,
    body: useJson ? JSON.stringify(body) : body,
    headers: {
      "Content-type": useJson
        ? "application/json"
        : "text/plain; charset=UTF-8",
      "x-message-id": messageId,
    },
  };
}

function errorResponse(status, message, body, messageId) {
  return {
    statusCode: status,
    message,
    headers: {
      "Content-type": "application/json",
      "x-message-id": messageId,
    },
    body: JSON.stringify(body),
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
