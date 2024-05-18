const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('Id chưa đúng định dạng id mongo');
  }
  return value;
};

module.exports = { objectId };
