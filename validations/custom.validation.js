const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('Id không đúng định dạng mongo');
  }
  return value;
};

module.exports = { objectId };
