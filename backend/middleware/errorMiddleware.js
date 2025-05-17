const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // if for wahtever reason the error code is 200, change it to 500 to reflect that its an error
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource Not Found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "pancakes" : err.stack,
  });
};

export { notFound, errorHandler };
