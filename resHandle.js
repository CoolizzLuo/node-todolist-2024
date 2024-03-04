const HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
  'Access-Control-Max-Age': 2592000, // 30 days
  'Content-Type': 'application/json',
};

const resHandle = (res, statusCode, message = '', data = null) => {
  let success = false;
  if (statusCode >= 200 && statusCode < 300) {
    success = true;
  }

  res.writeHead(statusCode, HEADERS);
  res.write(
    JSON.stringify({
      success,
      message,
      data,
    })
  );
  res.end();
};

module.exports = resHandle;
