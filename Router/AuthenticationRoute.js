const router = require("express").Router();

const {
    login,
    register,
    getAllUser,
    getUserName,
    changePassword,
    currentUser,
    deleteUser,
    loginGoogle
} = require("../Controller/LoginUserController");

const auth = require("../Middleware/AdminAuthMiddleware");

router.post("/login", login);
router.post("/google", loginGoogle);
router.post("/register", register);
router.get("/:id", getUserName);
router.get("/users/all", getAllUser);
router.get("/users/currentUser", auth, currentUser);
router.put("/changePassword/:id", changePassword);
router.delete("/:id", deleteUser);

module.exports = router;