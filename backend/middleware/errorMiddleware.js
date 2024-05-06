const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    res.status(400).json({ message: "Resource not found" });
  } else {
    res.status(statusCode).json({ message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
  }
};

export { notFound, errorHandler };
