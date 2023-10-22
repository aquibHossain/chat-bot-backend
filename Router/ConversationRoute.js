const router = require("express").Router();

const {
    createConversation,
    getConversation,
    getInbox,
    getMessages,
    sendMessage,
    createConversationwithUser
} = require("../Controller/ConversationController");

router.post('/', createConversation)
router.post('/user', createConversationwithUser)
router.get("/",getConversation)
router.post("/inbox",getInbox)
router.get("/messages/:conversation_id",getMessages)
router.post("/messages/send", sendMessage)

module.exports = router;