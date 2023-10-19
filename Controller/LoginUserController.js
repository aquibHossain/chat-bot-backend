const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
       
        if (req.body.firstName) {
            const query = { email: req.body.email};

            const result = await User.findOne(query);
console.log(result,req.body.email)
            if (result) {
                return res.status(500).json({
                    message: "This User Email already exists",
                });
            }

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            });

            const saveUser = await user.save();
            res.status(200).json({
                newUser: {
                    _id: saveUser._id,
                },
                message: "User created successfully.",
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



exports.login = async (req, res) => {
    try {
        const result = await User.findOne({ email: req.body.email });

        if (!result) {
            return res.status(400).json({

                message: "This User Email does not exist",
            });
        }
        

        const matchPassword = await result.matchPassword(req.body.password);

        if (!matchPassword) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        const token = jwt.sign({ id: result._id, email: result.email }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        res.status(200).json({
            user: result,
            token,
            message: "User Logged in Successfully",
        });

    }

    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while logging in" });
    }
}
exports.loginGoogle = async (req, res) => {
    try {
        let userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            });

             userData = await user.save();
        }


        const token = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        res.status(200).json({
            user: userData,
            token,
            message: "User Logged in Successfully",
        });

    }

    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while logging in" });
    }
}

exports.changePassword = async (req, res) => {
    try {


        const admin = await User.findOne({ userId: req.params.id });

        const currentPassword = req.body.current;
        const newPassword = req.body.new;

        // check if password is correct
        const isMatch = await admin.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        // update password
        admin.password = newPassword;

        const update = await admin.save();

        if (update) {
            res.status(200).json({
                message: "Password has been updated successfully"
            });
        }
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ message: "An error occurred while updating password" });  // 500 internal server error
    }
}


exports.getUserName = async (req, res) => {
    try {
        const query = { userId: req.params.id };
        const result = await User.findOne(query);
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
exports.getAllUser = async (req, res) => {
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

exports.currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({
            message: "Get user successfully",
            user
        });
    }
    catch (e) {
        res.status(500).json({
            message: "An error occurred while get user",
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