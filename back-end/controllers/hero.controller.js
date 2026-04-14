const Hero = require('../models/Hero');
const { cloudinary } = require('../config/cloudinary');

exports.getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne();
        if (!hero) {
            return res.status(404).json({ message: 'Hero data not found' });
        }
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateHero = async (req, res) => {
    try {
        const { title, bio } = req.body;
        let { socialLinks, avatar } = req.body;

        // Parse socialLinks if it's a string (from FormData)
        if (typeof socialLinks === 'string') {
            socialLinks = JSON.parse(socialLinks);
        }

        let hero = await Hero.findOne();

        // Handle file upload for avatar
        if (req.file) {
            avatar = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        } else if (typeof avatar === 'string') {
            // Handle cases where avatar might be sent back as a URL string if no new file is uploaded
            avatar = JSON.parse(avatar);
        }

        if (hero) {
            // Delete old avatar from Cloudinary if a new file is uploaded
            if (req.file && hero.avatar && hero.avatar.public_id) {
                try {
                    await cloudinary.uploader.destroy(hero.avatar.public_id);
                } catch (err) {
                    console.error('Error deleting old avatar from Cloudinary:', err);
                }
            }

            hero.avatar = avatar || hero.avatar;
            hero.title = title || hero.title;
            hero.bio = bio || hero.bio;
            hero.socialLinks = socialLinks || hero.socialLinks;
            await hero.save();
        } else {
            hero = new Hero({ avatar, title, bio, socialLinks });
            await hero.save();
        }

        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
