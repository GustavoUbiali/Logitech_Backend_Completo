function notFound(req, res) {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl
  });
}

function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Erro interno do servidor' : err.message
  });
}

module.exports = { notFound, errorHandler };
