const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
    {
        avatar: {
            url: { type: String, required: true },
            public_id: { type: String },
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            required: true,
            trim: true,
        },
        socialLinks: [
            {
                icon: { type: String, required: true },
                label: { type: String, required: true },
                href: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Hero', heroSchema);
