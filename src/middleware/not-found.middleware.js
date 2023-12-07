function notFoundMiddleware(request, response) {
  response.status(404).json({
    message: `Route ${request.method} ${request.url} not found`,
    status: 404,
  });
}

export default notFoundMiddleware;
