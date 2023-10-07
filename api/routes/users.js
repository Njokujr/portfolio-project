const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verify = require("../verifyToken");
const CryptoJS = require("crypto-js");

//UPDATE
router.put("/:id", verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        var decryptedWA = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const decryptedPassword = decryptedWA.toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === req.body.currentPassword) {
            user.profilePic = req.body.profilePic || user.profilePic;
            if (req.body.password) {
                user.password = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.SECRET_KEY
                ).toString();
            }
            const upDatedUser = await user.save();
            res.json(upDatedUser);
        } else {
            return res.status(403).json({ errors: [{ msg: "Password Invalid" }] });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found");
        }
    } else {
        res.status(400).json("You can update only your account");
    }
});

//GET USER
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all user
router.get("/all", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to see all users!");
    }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you allready follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});
module.exports = router;

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePic } = friend;
            friendList.push({ _id, username, profilePic });
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user stats
router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// search user
router.get("/search/:key", async (req, res) => {
    try {
        let data = await User.find({
            $or: [{ username: { $regex: req.params.key } }],
        });
        res.send(data);
    } catch (err) {
        res.status(500).json(err);
    }
});
