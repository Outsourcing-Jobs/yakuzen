const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hero = require('./models/Hero');

dotenv.config();

const seedHero = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to MongoDB for seeding');

        const existingHero = await Hero.findOne();
        if (existingHero) {
            console.log('Hero data already exists. Skipping seed.');
            process.exit(0);
        }

        const initialHero = new Hero({
            avatar: {
                url: 'https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyNjJ3OTVvdmY4eTk0ajlxNjRudnN1bzJleDNqN2JjbjB1Zng4b3NpdSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L05HgB2h6qICDs5Sms/200.gif',
                public_id: 'initial_avatar',
            },
            title: 'DICH ✦ DIGITAL ARTIST',
            bio: "Hi, I'm Yakuzen (Dich), nice to work with you",
            socialLinks: [
                { icon: '𝕏', label: 'Twitter', href: 'https://x.com/yakuzen345' },
                { icon: '▶', label: 'YouTube', href: 'https://ko-fi.com/yakuzen345' },
                { icon: '◈', label: 'Pixiv', href: '#' },
            ],
        });

        await initialHero.save();
        console.log('Hero data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding hero data:', error);
        process.exit(1);
    }
};

seedHero();
