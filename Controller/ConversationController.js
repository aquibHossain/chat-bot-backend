const Conversation=require("../Models/ConversationModel")
const User = require("../Models/UserModel");
const Message = require("../Models/MessagesModel");

exports.createConversation = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.userEmail })
        const user2 = await User.findOne({ email: req.body.receiverEmail })
        
      

        const newConversation = new Conversation({
            creator: {
                name: user.firstName,
                avatar: "",
                email:user.email
            },
            participant:{
                name: user2.firstName,
                avatar: "",
                email:user2.email
            },
          });
      
          // Save the conversation to the database
          const savedConversation = await newConversation.save();
          res.status(201).json(savedConversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the conversation' });0
    }
}

exports.getConversation = async (req, res) => {
    try {

        const result = await Conversation.find({});

        res.status(200).json({
            result,
            message: "All Conversation",
        });
    }

    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}

exports.getInbox = async (req, res) => {
    try {
   
        const conversation = await Conversation.find({
            $or: [
                { "creator.email": req.body.email },
                {"participant.email":req.body.email}
            ]
        })

        res.status(200).json({
            conversation
        });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}

exports.getMessages = async (req, res) => {
    try {
       
        if (req.params.conversation_id) {
            const messages = await Message.find({
                conversation_id: req.params.conversation_id
            })
                // ?.sort("-createdAt");
  
            const { participant,creator } = await Conversation.findById(req.params.conversation_id)
     
            
         
            res.status(200).json({
                participant,
                messages: messages,
                user: creator.email,
                conversation_id:req.params.conversation_id
            });
        }
        else {
            
        }
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}

exports.sendMessage = async (req, res) => { 
    try {
      
        if (req.body.message || (req.files && req.files.length > 0)) {
            
            let attachment = null;

        if (req.files && req.files.length > 0) {
            attachment = []
            req.files.foreach((file) => {
                attachment.push(file.filename)
            })

            }

            const newMessage = new Message({
                text: req.body.message,
                attachment: attachment,
                sender: {
                    email:req.body.email,
                        name:req.body.name,
                    avatar:req.body.avatar ||null
                },
                receiver: {
                    email:req.body.email2,
                    name:req.body.name2,
                avatar:req.body.avatar ||null
                },
                conversation_id:req.body.conversation_id
            })

            const result = await newMessage.save()

            global.io.emit('new_message', {
                message: {
                    sender: {
                        email:req.body.email,
                            name:req.body.name,
                        avatar:req.body.avatar ||null
                    },
                    conversation_id: req.body.conversation_id,
                    message: req.body.message,
                    attachment: attachment,
                    date_time: result.date_time
                }
            })
            res.status(200).json({
                message: "Successful",
            data:result});
            
    }}
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}