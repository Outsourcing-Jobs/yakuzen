import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'antd';
import './HomePage.css';
import GlobalBackground from '../../components/Default/GlobalBackground';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import SafeImage from '../../components/Default/SafeImage';

const staticCategories = [
    { name: 'TOS', path: '/tos' },
    { name: 'VGEN', path: 'https://vgen.co/Yakuzen345' },
];

const SpikeBorder = () => (
    <div className="spike-border" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="spike">
                ▲
            </span>
        ))}
    </div>
);

const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const [activeWork, setActiveWork] = useState(null);
    const [categories, setCategories] = useState(staticCategories);
    const [recentWorks, setRecentWorks] = useState([]);
    const [heroData, setHeroData] = useState({
        avatar: { url: 'https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyNjJ3OTVvdmY4eTk0ajlxNjRudnN1bzJleDNqN2JjbjB1Zng4b3NpdSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L05HgB2h6qICDs5Sms/200.gif' },
        title: 'DICH ✦ DIGITAL ARTIST',
        bio: "Hi, I'm Yakuzen (Dich), nice to work with you",
        socialLinks: [
            { icon: '𝕏', label: 'Twitter', href: 'https://x.com/yakuzen345' },
            { icon: '▶', label: 'YouTube', href: 'https://ko-fi.com/yakuzen345' },
            { icon: '◈', label: 'Pixiv', href: '#' },
        ],
    });
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await axios.get('/hero');
                setHeroData(response.data);
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                const dynamicCats = response.data.map(cat => ({
                    name: cat.name.toUpperCase(),
                    path: `/category/${cat.slug}`,
                }));
                setCategories([...staticCategories, ...dynamicCats]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchRecentWorks = async () => {
            try {
                const response = await axios.get('/products?limit=10');
                const mappedWorks = response.data.map(product => ({
                    id: product._id,
                    slug: product.slug,
                    title: product.name,
                    tag: product.category?.name?.toUpperCase() || 'UNCATEGORIZED',
                    imgUrl: product.images && product.images.length > 0 ? product.images[0].url : '',
                }));
                setRecentWorks(mappedWorks);
            } catch (error) {
                console.error('Error fetching recent works:', error);
            }
        };

        fetchHeroData();
        fetchCategories();
        fetchRecentWorks();
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`hp-root ${loaded ? 'hp-loaded' : ''}`}>
            {/* <div className="hp-noise" aria-hidden="true" />

      <div className="hp-studs" aria-hidden="true">
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className="stud" />
        ))}
      </div> */}
            <GlobalBackground />

            {/* ===== HERO SECTION ===== */}
            <section className="hp-hero">
                <div className="hp-hero__left">
                    <div className="hp-avatar-wrap">
                        <div className="hp-avatar-ring" />
                        <div className="hp-avatar-ring hp-avatar-ring--2" />
                        <div className="hp-avatar">
                            <span className="hp-avatar__placeholder">
                                <SafeImage src={heroData.avatar?.url} alt="Avatar" />
                            </span>
                        </div>
                        {/* paw print deco */}
                        <span className="paw paw--tl">🐾</span>
                        <span className="paw paw--br">🐾</span>
                    </div>

                    <p className="hp-bio">
                        <span className="hp-bio__line">{heroData.title}</span>
                        <span className="hp-bio__line">{heroData.bio}</span>
                    </p>

                    <div className="hp-socials">
                        {heroData.socialLinks?.map(s => (
                            <a key={s.label} href={s.href} className="hp-social-btn" title={s.label}>
                                <span className="hp-social-btn__icon">{s.icon}</span>
                                <span className="hp-social-btn__bar" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="hp-hero__right">
                    {/* diagonal slash deco */}
                    <div className="slash-deco" aria-hidden="true">
                        <span className="slash slash--1" />
                        <span className="slash slash--2" />
                        <span className="slash slash--3" />
                    </div>

                    <div className="hp-brand">
                        <span className="hp-brand__sub">— PORTFOLIO —</span>
                        <h1 className="hp-brand__name">
                            <span className="char c1">Y</span>
                            <span className="char c2">A</span>
                            <span className="char c3">K</span>
                            <span className="char c4">U</span>
                            <span className="char c5">Z</span>
                            <span className="char c6">E</span>
                            <span className="char c7">N</span>
                        </h1>
                        <div className="hp-brand__tag">
                            <span className="tag-dot" />
                            アーティスト
                            <span className="tag-dot" />
                        </div>
                    </div>

                    <nav className="hp-categories">
                        {categories.map((cat, i) => {
                            const isExternal = cat.path.startsWith('http');
                            return isExternal ? (
                                <a key={cat.name} href={cat.path} target="_blank" rel="noopener noreferrer" className="hp-cat-link">
                                    <div className="hp-cat-link__icon-box">
                                        <span className="hp-cat-link__icon-v">◈</span>
                                    </div>
                                    <span className="hp-cat-link__label">{cat.name}</span>
                                </a>
                            ) : (
                                <Link key={cat.name} to={cat.path} className="hp-cat-link">
                                    <div className="hp-cat-link__icon-box">
                                        <span className="hp-cat-link__icon-v">◈</span>
                                    </div>
                                    <span className="hp-cat-link__label">{cat.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* <ChainDecor /> */}
                </div>

                <SpikeBorder />
            </section>

            {/* ===== RECENT WORKS SECTION ===== */}
            <section className="hp-works">
                <div className="hp-works__header">
                    <div className="hp-works__title-wrap">
                        <span className="hp-works__eyebrow">最近のプロジェクト</span>
                        <h2 className="hp-works__title">
                            <span className="title-stroke">RECENT</span> <span className="title-fill">WORKS</span>
                        </h2>
                    </div>
                    <div className="hp-works__controls">
                        <button className="carousel-btn" onClick={() => carouselRef.current?.prev()}>
                            ‹
                        </button>
                        <button className="carousel-btn carousel-btn--next" onClick={() => carouselRef.current?.next()}>
                            ›
                        </button>
                    </div>
                </div>

                <div className="hp-carousel-wrap">
                    <Carousel
                        ref={carouselRef}
                        dots={false}
                        slidesToShow={3}
                        slidesToScroll={1}
                        infinite
                        autoplay
                        autoplaySpeed={2000}
                        responsive={[
                            { breakpoint: 960, settings: { slidesToShow: 2 } },
                            { breakpoint: 600, settings: { slidesToShow: 1 } },
                        ]}
                    >
                        {recentWorks.concat(recentWorks).map((work, i) => (
                            <div key={`${work.id}-${i}`} className="hp-work-slide">
                                <Link to={`/product/${work.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div
                                        className={`hp-work-card ${activeWork === i ? 'hp-work-card--active' : ''}`}
                                        onMouseEnter={() => setActiveWork(i)}
                                        onMouseLeave={() => setActiveWork(null)}
                                    >
                                        <div className="hp-work-card__img">
                                            <div className="hp-work-card__placeholder">
                                                <SafeImage
                                                    src={work.imgUrl}
                                                    alt={work.title}
                                                />
                                            </div>
                                            <div className="hp-work-card__overlay">
                                                <span className="hp-work-card__tag">{work.tag}</span>
                                                <span className="hp-work-card__title">{work.title}</span>
                                            </div>
                                            <div className="hp-work-card__corner hp-work-card__corner--tl" />
                                            <div className="hp-work-card__corner hp-work-card__corner--br" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="hp-works__actions">
                    <a href="#live" className="hp-btn hp-btn--red">
                        <span className="hp-btn__icon">⛓ SEE ME WORK LIVE</span>
                    </a>
                    <a href="/art-showcase" className="hp-btn hp-btn--ghost">
                        <span className="hp-btn__icon">+ VIEW ALL</span>
                    </a>
                </div>
            </section>

            {/* footer chain */}
            <footer className="hp-footer">
                {/* <ChainDecor /> */}
                <p className="hp-footer__copy">© YAKUZEN · ALL RIGHTS RESERVED · 犬</p>
            </footer>
        </div>
    );
};

export default HomePage;
