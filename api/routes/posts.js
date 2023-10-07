const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const verify = require("../verifyToken");

//CREATE POST
router.post(
    "/",
    [
        check("title", "Title is required").notEmpty(),
        check("desc", "Description is required").notEmpty(),
        check("categories", "Post category is required").notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

//UPDATEPOST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username || req.user.isAdmin) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POST
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER'S ALL POST
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);


    } catch (err) {
        console.log(err.message);
        if (err.kind == "ObjectId") {
            res.status(404).json({ msg: "Post not found" });
            res.status(500).send("Server Error");
        }
    }
});

module.exports = router;

//Like a post
router.put("/:id/like", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post has already been liked" });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        if (err.kind == "ObjectId") {
            res.status(400).json({ msg: "Post not found" });
            res.status(500).send("Server Error");
        }
    }
});

//create comment
router.post("/:id/comments", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post not found" }] });
        }

        const comment = {
            username: user.username,
            desc: req.body.desc,
        };

        post.comments.unshift(comment);
        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.log(err.message);
        if (err.kind == "ObjectId") {
            res.status(400).json({ msg: "Post not found" });
            res.status(500).send("Server Error");
        }
    }
});

//get comment
router.get("/:id/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(
            (comment) => comment._id.toString() === req.params.commentId
        );
        res.status(200).json(post.comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete comment
router.delete("/:id/comments/:commentId", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(
            (comment) => comment._id.toString() === req.params.commentId
        );

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        if (comment.user !== req.user.username) {
            return res
                .status(401)
                .json({ msg: "You are not authorized to delete this comment" });
        }

        post.comments = post.comments.filter(
            ({ id }) => id != req.params.commentId
        );

        await post.save();

        res.json("Comment deleted");
    } catch (err) {
        console.log(err.message);
        if (err.kind == "ObjectId") {
            res.status(404).json({ msg: "Comment not found" });
            res.status(500).send("Server Error");
        }
    }
});

//update comment
router.put("/:id/comments/:commentId", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(
            (comment) => comment._id.toString() === req.params.commentId
        );

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        if (comment.user !== req.user.username) {
            return res
                .status(401)
                .json({ msg: "You are not authorized to delete this comment" });
        }

        comment.desc = req.body.desc || comment.desc;

        updatedComment = await post.save();
        res.json(updatedComment);
    } catch (err) {
        console.log(err.message);
        if (err.kind == "ObjectId") {
            res.status(404).json({ msg: "Comment not found" });
            res.status(500).send("Server Error");
        }
    }
});

//search blog
router.get("/search/:key", async (req, res) => {
    try {
        let data = await Post.find({
            $or: [{ title: { $regex: req.params.key } }],
        });
        res.send(data);
    } catch (err) {
        res.status(500).json(err);
    }
});
