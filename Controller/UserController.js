const User = require("../Models/UserInformationModal");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
       
        if (req.body.firstName) {
            const query = { email: req.body.email };

          

            const result = await User.findOne(query);
   
            if (result) {
                const token = jwt.sign({ id: result._id, email: result.email }, process.env.JWT_SECRET, {
                    expiresIn: "6h"
                });
                return res.status(200).json({
                    user: result,
                    token,
                    message: "This User Email already exists",
                });
            }

            const user = new User({
                firstName: req.body.firstName,
                email: req.body.email,
                message: req.body.message,
                phone: req.body.phone,
            });

            const saveUser = await user.save();
         
            const token1 = jwt.sign({ id: saveUser._id, email: saveUser.email,firstName:saveUser.firstName }, process.env.JWT_SECRET, {
                expiresIn: "6h"
            });
            res.status(200).json({
                user: saveUser,
                token:token1,
                message: "User Created Successfully",
            });
           }
    
        else {
            return res.status(500).json({
                message: "Enter All Info",
            });
    }
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({

            message: "An error occurred while creating user",
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const result = await user.remove();
        res.status(200).json({
            message: "Deleted",
            result
        });
    }
    catch (e) {
        res.status(500).json({
            message: "An error occurred while get user",
        });
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            message: "Get user successfully",
            user:user
        });
    }
    catch (e) {
        res.status(500).json({
            message: "An error occurred while get user",
        });
    }
}

exports.getUser = async (req, res) => {
    try {

        const result = await User.find({});

        res.status(200).json({
            user: result,
            message: "All Users",
        });
    }

    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}