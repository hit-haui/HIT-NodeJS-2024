const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PATH_FILE_USERS = path.join(__dirname, '../database/users.json');

const getDataToJson = () => {
  const rawData = fs.readFileSync(PATH_FILE_USERS, 'utf8');
  return JSON.parse(rawData);
};

const saveDataToJson = (data) => {
  fs.writeFileSync(PATH_FILE_USERS, JSON.stringify(data, null, 2));
};

const findAll = () => {
  const users = getDataToJson();
  return users;
};

const findById = (id) => {
  const users = getDataToJson();
  return users.find((user) => user.id === id) || null;
};

const create = (data) => {
  const users = getDataToJson();
  users.push({
    id: uuidv4(),
    ...data,
  });
  saveDataToJson(users);
  return users;
};

const updateById = (id, body) => {
  const users = getDataToJson();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...body };
  saveDataToJson(users);
  return users;
};

const deleteById = (id) => {
  const users = getDataToJson();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users.splice(index, 1);
  saveDataToJson(users);
  return users;
};

const lockById = (id) => {
  const users = getDataToJson();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], isLocked: !users[index].isLocked };
  saveDataToJson(users);
  return users[index];
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  lockById,
};
