function err(message, code) {
  let e = new Error(message);

  if (code) {
    e.statusCode = code;
  }
  console.log('Soy e ', e);
  return e;
}

module.exports = err;
