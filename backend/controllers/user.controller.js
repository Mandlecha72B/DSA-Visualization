const User = require("../models/user.model");

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            filteredUsers,
        });
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
module.exports = getUsersForSidebar;