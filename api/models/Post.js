const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            require: true,
        },
        photo: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        categories: {
            type: Array,
            require: false,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                },
            },
        ],
        comments: [
            {
                username: {
                    type: String,
                },
                desc: {
                    type: String,
                    require: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            }
        ]
    },
    { timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema);

