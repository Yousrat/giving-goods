var express = require("express");
var router = new express.Router();
var userController = require("../controllers/userController");
var peopleController = require("../controllers/peopleController");
var itemController = require("../controllers/itemController");

// Get all users
router.get("/user-list", userController.allUsers);
// Create a new user
router.post("/new-user", userController.addUser);
// Get logged in user info
router.get("/get-my-info", userController.getMyInfo);
// Update logged in user info
router.post("/update-my-info", userController.updateMyInfo);
// Suspend a user
router.post("/suspend-user", userController.suspendUser);
// Activate a user account
router.post("/activate-acc", userController.activateAcc);

// Get all people
router.get("/all-people-list", peopleController.allPeople);
// Get all people to specific shelter
router.get("/my-people-list", peopleController.myPeople);
// Add new people
router.post("/new-people", peopleController.addPeople);

// Get all item
router.get("/all-item-list", itemController.allItem);
// Get all item to specific people
router.get("/my-item-list", itemController.myItem);
// Get item info by its id
router.get("/item-info/:id", itemController.findItem);
// Get all my items
router.get("/all-my-items", itemController.findMyItemsIds);
// Add new item
router.post("/new-item", itemController.addItem);

module.exports = router;
