export const handleDuplicateField = (res, message) => {
  return res.status(409).json({
    code: 409,
    message: message,
    data: null,
  });
};

export const handleNotFound = (res, message) => {
  return res.status(404).json({
    code: 404,
    message: message,
    data: null,
  });
};

export const handleServerError = (res) => {
  return res.status(500).json({
    code: 500,
    message: "Internal Server Error",
    data: null,
  });
};

export const handleSuccess = (res, message, data) => {
  return res.status(200).json({
    code: 200,
    message,
    data,
  });
};

export const handleBadRequest = (res, message) => {
  return res.status(400).json({
    code: 400,
    message,
    data: null,
  });
};

export const handleBannedCustomer = (res, message) => {
  return res.status(403).json({
    code: 403,
    message,
    data: null,
  });
};
