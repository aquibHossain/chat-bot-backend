const router = require("express").Router();

const {
    createUser,
    deleteUser,
    getUser,
    currentUser
} = require("../Controller/UserController");

const auth=require("./../Middleware/WebsiteUserAuthMiddleware")

router.post("/", createUser);
router.get("/", getUser);
router.get("/current-user",auth, currentUser);
router.delete("/:id", deleteUser);

module.exports = router;