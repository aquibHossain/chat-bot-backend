const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const organizationSchema = new mongoose.Schema(
    {  
        firstName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        admins: {
            type: [String],
            default:[]
        },
        websites: {
            type: [String],
            default:[]
        },
    },
    {
        timestamps: true,
    }
);


organizationSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

organizationSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    if (!this.password) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);


});


const model = mongoose.model("organization", organizationSchema);
module.exports = model;