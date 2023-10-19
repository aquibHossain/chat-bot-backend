const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        creator: {
            id:mongoose.Types.ObjectId,
            name:String,
            avatar: String,
            email:String
        },
        participant: {
            id:mongoose.Types.ObjectId,
            name:String,
            avatar: String,
            email:String
        },
        last_updated: {
            type: Date,
            default: Date.now,
        },
        
    },
    {
        timestamps: true,
    }
);


const model = mongoose.model("Conversation", ConversationSchema);
module.exports = model;