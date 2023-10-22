const User = require("../Models/UserModel");
const Organization = require("../Models/OrganizationsModels");



exports.addWeb_Support = async (req, res) => {
    try {
        const data = await Organization.findOne({ firstName: req.body.firstName })
        console.log(data)
        let result=[]
        if (req.body.email)
        {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(500).json({
                    message: "This User Email doest not exists",
                });
            }

            result = await data.updateOne({
                $push: { admins:  req.body.email }
            });
        
        }
        else {
            result = await data.updateOne({
                $push: { websites: { $each: [{ name: req.body.name,link:req.body.link}], $position: 0 } }
            });
        }
       res.status(200).json({
            result,
           });
     
    }

    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}

exports.deleteWeb = async (req, res) => {
    try {
        const result = await Organization.updateOne(
            { email: req.params.email },
            { $pull: { websites: { _id: req.params.id } } }
        );
         res.status(200).json({
            result,
           });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
}
exports.deleteAdmins = async (req, res) => {
    try {
        const result = await Organization.updateOne(
            { email: req.params.email },
            { $pull: { admins: req.params.id} }
        );
         res.status(200).json({
            result,
           });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "An error occurred while getting data" });
    }
 }
