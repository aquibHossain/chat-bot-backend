const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
    {
        text: {
            type:String
        },
        attachment: [
            {
                type:String
            }
        ],
        sender: {
            name:String,
            avatar: String,
            email:String
        },
        receiver: {
            name:String,
            avatar: String,
            email:String
        },
        date_time: {
            type: Date,
            default: Date.now,
            
        },
        conversation_id: {
            type: mongoose.Types.ObjectId,
            required:true
        }
    },
    {
        timestamps: true,
    }
);


const model = mongoose.model("Message", messageSchema);
module.exports = model;