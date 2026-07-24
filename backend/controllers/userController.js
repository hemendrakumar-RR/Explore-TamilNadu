const User = require("../models/User");

exports.uploadProfilePhoto = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        user.profileImage = req.file.path;

        await user.save();

        res.json({
            success: true,
            image: user.profileImage
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Upload failed"
        });

    }

};