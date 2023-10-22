const router = require("express").Router();

const {
    login,
    register,
    getAllUser,
    getUserName,
    changePassword,
    currentUser,
    currentUserOrg,
    deleteUser,
    loginGoogle,
    registerOrganization,
    loginOrganization
} = require("../Controller/LoginUserController");

const organizationAuth = require("../Middleware/AdminAuthMiddleware");
const adminAuth = require("../Middleware/UserAuthMiddleware");

router.post("/login/organization", loginOrganization);
router.post("/login", login);
router.post("/google", loginGoogle);
router.post("/register", register);
router.post("/register/organization", registerOrganization);
router.get("/:id", getUserName);
router.get("/users/all", getAllUser);
router.get("/users/currentUser", adminAuth, currentUser);
router.get("/users/currentUser/org", organizationAuth, currentUserOrg );
router.put("/changePassword/:id", changePassword);
router.delete("/:id", deleteUser);

module.exports = router;