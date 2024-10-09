// Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({message: err.message});
};
