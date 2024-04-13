const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const PATH_FILE_USER = path.join(__dirname, '../database/users.json');

const getDataToJson = () => {
   const rawData = fs.readFileSync(PATH_FILE_USER, 'utf8');
   return JSON.parse(rawData);
}

const saveDataToJson = (data) => {
    fs.writeFileSync(PATH_FILE_USER, JSON.stringify(data, null, 2));
} 

const findAll = () => {
    const users = getDataToJson();
    return users;
};

const findId = (id) => {
    const users = getDataToJson();
    return users.find((users) => users.id === id ) || null;
};

const updateById = (id, fullname) =>{
    const users = getDataToJson();
    const index = users.findIndex((users) => users.id === id );
    if(index === -1) return null; 
    users[index].fullname = fullname;
    saveDataToJson(users);
    return users;
};

const create = (data) => {
    const users = getDataToJson();
    users.push({
        id: uuidv4(),
        ...data   
    });
    saveDataToJson(users);
    return users
};

const deleteById = (id) => {
    const users = getDataToJson();
    const index = users.findIndex((users) => users.id === id );
    if(index === -1) return null; 
    users.splice(index, 1);
    saveDataToJson(users);
    return users;
};

const lockById = (id) => {
    const users = getDataToJson();
    const index = users.findIndex((users) => users.id === id );
    if(index === -1) return null; 
    users[index] = {...users[index], islocked: !users[index].islocked};
    saveDataToJson(users);
    return users[index];
};

module.exports = {
    findAll,
    findId,
    create,
    updateById,
    deleteById,
    lockById
}
