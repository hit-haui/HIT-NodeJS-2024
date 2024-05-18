const objectId = (value , helpers) => {
    if(!value.match(/^[0-9a-fA-F]{24}$/)){
        return helpers.error('Id định dạnh không đúng');
    }
    return value;
};

module.exports = {objectId};
