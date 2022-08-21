let express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.get_posts);
router.post("/", postController.create_post);
router.post("/:id", postController.add_comment);
router.post("/reply/:id", postController.add_reply);
router.put("/:id", postController.add_post_like);
router.put("/comment/:id", postController.add_comment_like);
router.put("/reply/:id", postController.add_reply_like);
// router.post("/getReact/:id", postController.getReactById_post);
// router.get("/getReact/:id", postController.getReactById_get);
router.delete("/:id", postController.delete_post);

module.exports = router;
