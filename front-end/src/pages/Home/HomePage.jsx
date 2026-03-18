import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'antd';
import './HomePage.css';

const socialLinks = [
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: '▶', label: 'YouTube', href: '#' },
    { icon: '◈', label: 'Pixiv', href: '#' },
    { icon: '⬡', label: 'Discord', href: '#' },
];

const categories = ['TOS', 'MODEL ART', 'ILLUSTRATION'];

const recentWorks = [
    {
        id: 1,
        title: 'Kuro Inu',
        tag: 'ILLUSTRATION',
        imgUrl: 'https://framerusercontent.com/images/aPzYEPAdRz1sF28869k0vyLBts.jpg?width=700&height=943',
    },
    {
        id: 2,
        title: 'Chain Break',
        tag: 'MODEL ART',
        imgUrl: 'https://framerusercontent.com/images/B5ltLWWMNvIgAzAesNvBfvwe69Y.jpg?width=700&height=943',
    },
    {
        id: 3,
        title: 'Spike & Shade',
        tag: 'ILLUSTRATION',
        imgUrl: 'https://framerusercontent.com/images/aPzYEPAdRz1sF28869k0vyLBts.jpg?width=700&height=943',
    },
    {
        id: 4,
        title: 'Stray Dogs',
        tag: 'MODEL ART',
        imgUrl: 'https://framerusercontent.com/images/nBO5THno7iF7y7SsHfiRhBfzBY.jpg?width=700&height=943',
    },
];

const ChainDecor = () => (
    <div className="chain-row" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="chain-link">
                @to.la.dich
            </span>
        ))}
    </div>
);

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
    const carouselRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`hp-root ${loaded ? 'hp-loaded' : ''}`}>
            {/* Noise overlay */}
            <div className="hp-noise" aria-hidden="true" />

            {/* Background studs grid */}
            <div className="hp-studs" aria-hidden="true">
                {Array.from({ length: 48 }).map((_, i) => (
                    <span key={i} className="stud" />
                ))}
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="hp-hero">
                <div className="hp-hero__left">
                    <div className="hp-avatar-wrap">
                        <div className="hp-avatar-ring" />
                        <div className="hp-avatar-ring hp-avatar-ring--2" />
                        <div className="hp-avatar">
                            <span className="hp-avatar__placeholder">
                                <img src="https://i.redd.it/gs5zwxdzpnog1.jpeg" alt="" />
                            </span>
                        </div>
                        {/* paw print deco */}
                        <span className="paw paw--tl">🐾</span>
                        <span className="paw paw--br">🐾</span>
                    </div>

                    <p className="hp-bio">
                        <span className="hp-bio__line">DICH ✦ DIGITAL ARTIST</span>
                        <span className="hp-bio__line">Hi, I'm Yakuzen (Dich), nice to work with you</span>
                    </p>

                    <div className="hp-socials">
                        {socialLinks.map(s => (
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
                        {categories.map((cat, i) => (
                            <a key={cat} href={`#${cat.toLowerCase().replace(' ', '-')}`} className="hp-cat-link">
                                <span className="hp-cat-link__num">0{i + 1}</span>
                                <span className="hp-cat-link__label">{cat}</span>
                                <span className="hp-cat-link__arrow">→</span>
                            </a>
                        ))}
                    </nav>

                    <ChainDecor />
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
                        responsive={[
                            { breakpoint: 900, settings: { slidesToShow: 2 } },
                            { breakpoint: 600, settings: { slidesToShow: 1 } },
                        ]}
                    >
                        {recentWorks.concat(recentWorks).map((work, i) => (
                            <div key={`${work.id}-${i}`} className="hp-work-slide">
                                <div
                                    className={`hp-work-card ${activeWork === i ? 'hp-work-card--active' : ''}`}
                                    onMouseEnter={() => setActiveWork(i)}
                                    onMouseLeave={() => setActiveWork(null)}
                                >
                                    <div className="hp-work-card__img">
                                        <div className="hp-work-card__placeholder">
                                            {/* <span>🐕</span> */}
                                            <img
                                                src={work.imgUrl}
                                                alt={work.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="hp-works__actions">
                    <a href="#live" className="hp-btn hp-btn--red">
                        <span className="hp-btn__icon">⛓</span> SEE ME WORK LIVE
                    </a>
                    <a href="#all" className="hp-btn hp-btn--ghost">
                        <span className="hp-btn__icon">+</span> VIEW ALL
                    </a>
                </div>
            </section>

            {/* footer chain */}
            <footer className="hp-footer">
                <ChainDecor />
                <p className="hp-footer__copy">© YAKUZEN · ALL RIGHTS RESERVED · 犬</p>
            </footer>
        </div>
    );
};

export default HomePage;
