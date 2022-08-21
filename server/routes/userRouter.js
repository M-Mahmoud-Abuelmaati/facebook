const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { checkAuth } = require("../middleware/authMiddleware");

router.get("/getauth", checkAuth);
router.get("/profile/:id", userController.getProfile_get);
router.get("/profileid/:id", userController.getProfileById_get);
router.post("/addFriendRequest", userController.addFriendRequest_post);
router.post("/addFriend", userController.addFriend_post);
router.post("/login", userController.login_post);
router.post("/signup", userController.signup_post);
router.post("/logout", userController.logout_post);

module.exports = router;
