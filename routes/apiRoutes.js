var express = require("express");
var router = new express.Router();
var userController = require("../controllers/userController");

// Get all users
router.get("/user-list", userController.allUsers);
// Create a new user
router.post("/new-user", userController.addUser);
// Get logged in user info
router.get("/get-my-info", userController.getMyInfo);
// Update logged in user info
router.post("/update-my-info", userController.updateMyInfo);

module.exports = router;
