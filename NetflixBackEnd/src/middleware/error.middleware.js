const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    console.error(err);
  }

  return res.status(statusCode).json({
    message:
      isProduction && statusCode === 500
        ? "Internal server error"
        : err.message || "Internal server error",
  });
};

export default errorHandler;
