const express = require('express');

<<<<<<< HEAD
const classController = require("../controllers/class.controller");

const classRoute = express.Router();

classRoute.route("/").post(classController.createClass).get(classController.getAllClass);
classRoute.route("/:classId").get(classController.getClassById).put(classController.updateClassById).delete(classController.deleteClassById);
classRoute.route("/:classId/join").post(classController.addStudentToClass);
classRoute.route("/:classId/leave").post(classController.removeStudentFromClass);

module.exports = classRoute;
=======
const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/').post(classController.createClass);

classRoute.route('/:classId').get(classController.getClassById);

module.exports = classRoute;
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
