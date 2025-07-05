const success = (res, data, statusCode = 200, message = "Operación exitosa") => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const error = (res, errorData, statusCode = 500, message = "Operación fallida") => {
  let formattedError = errorData;
  if (Array.isArray(errorData)) {
    formattedError = errorData.reduce((acc, msg, index) => {
      acc[index] = msg;
      return acc;
    }, {});
  }
  res.status(statusCode).json({
    status: "error",
    message,
    error: formattedError,
  });
};

export default {
  success,
  error,
};
