function responseFormatter(msg, statusCode, data, req, err = true) {
  return {
    status: statusCode || 500,
    message: msg || `Message`,
    data,
    metadata: {
      url: req.originalUrl,
      timestamp: req.receivedAt,
      totalRecords: data?.length,
      totalPages: req?.metadata?.totalPages,
      totalDocument: req?.metadata?.totalDocument,
      currentPage: req?.metadata?.currentPage,
      invalidParams: req.invalidParams,
    },
    error: err,
  };
}
module.exports = {
  responseFormatter,
};
