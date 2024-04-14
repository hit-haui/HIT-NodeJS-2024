const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');

const PATH_FILE_USERS = path.join(__dirname, '../database/users.json');

const getDataToJson = () => {
    const rawData = fs.readFileSync(PATH_FILE_USERS, 'utf8');
    console.log(rawData);
    return JSON.parse(rawData);
};

const saveDataToJson = (data) => {
    fs.writeFileSync(PATH_FILE_USERS, JSON.stringify(data, null, 2));
}

const findAll = () => {
    const users = getDataToJson();
    return users;
};

const findById = (id) => {
    const users = getDataToJson();
    return users.find(user => user.id === id) || null;
}

const create = (data) => {
    const users = getDataToJson();
    users.push(
        {
            id: uuidv4(),
            ...data,
        }
    );
    console.log(users);
    saveDataToJson(users);
    return users;
}

const updateById = (id, body) => {
    const users = getDataToJson();
    const index = users.findIndex(user => user.id === id);
    if (!index) {
        return null;
    }
    users[index] = { ...users[index], ...body };

    saveDataToJson(users);
    return users[index];
}

const deleteById = (id) => {
    const users = getDataToJson();
    const index = users.findIndex(user => user.id === id);
    if (!index) return null;
    users.splice(index, 1);
    saveDataToJson(users);
    return users;
}

const lockId = (id) => {
    const users = getDataToJson();
    const index = users.findIndex(user => user.id === id);
    if (!index) return null;

    users[index] = { ...users[index], islocked: !users[index].islocked };
    saveDataToJson(users);
    return users[index];
};

module.exports = { findAll, findById, create, updateById, deleteById, lockId }
