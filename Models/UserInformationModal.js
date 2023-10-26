const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


const model = mongoose.model("UserInformation", userSchema);
module.exports = model;