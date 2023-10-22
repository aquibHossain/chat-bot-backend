const router = require("express").Router();

const {
    addWeb_Support,
    deleteWeb,
    deleteAdmins
} = require("../Controller/AdminController");

const auth = require("../Middleware/AdminAuthMiddleware");

router.put("/add", addWeb_Support);
router.delete("/delete/web/:email/:id", deleteWeb);
router.delete("/delete/admin/:email/:id", deleteAdmins);



module.exports = router;