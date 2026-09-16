function required(value, field) {
  if (value === undefined || value === null || value === '') {
    const err = new Error(`Campo obrigatório: ${field}`);
    err.status = 400;
    throw err;
  }
}

function positiveNumber(value, field) {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    const err = new Error(`Campo inválido: ${field}`);
    err.status = 400;
    throw err;
  }
}

module.exports = { required, positiveNumber };
