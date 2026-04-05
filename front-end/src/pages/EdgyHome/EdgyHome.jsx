import React, { useState, useEffect } from 'react';
import './EdgyHome.css';
import GlobalBackground from '../../components/Default/GlobalBackground';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';

const IMAGE_PLACEHOLDER = 'https://toladich.carrd.co/assets/images/image01.gif?v=e46ef6f7';

const EdgyHome = () => {
    const navigate = useNavigate();
    const [modelPool, setModelPool] = useState([]);
    const [illusPool, setIllusPool] = useState([]);

    const shuffleArray = array => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        const fetchShowcaseData = async () => {
            try {
                const [modelRes, illusRes] = await Promise.all([
                    axios.get('/products?category=model-art&limit=20'),
                    axios.get('/products?category=illustration&limit=20'),
                ]);

                const mPool = [];
                modelRes.data.forEach(p => {
                    if (p.images) {
                        p.images.forEach(img => mPool.push({ url: img.url, slug: p.slug, name: p.name }));
                    }
                });

                const iPool = [];
                illusRes.data.forEach(p => {
                    if (p.images) {
                        p.images.forEach(img => iPool.push({ url: img.url, slug: p.slug, name: p.name }));
                    }
                });

                setModelPool(shuffleArray(mPool));
                setIllusPool(shuffleArray(iPool));
            } catch (error) {
                console.error('Error fetching showcase projects:', error);
            }
        };
        fetchShowcaseData();
    }, []);

    const getItem = (pool, index) => {
        if (!pool || pool.length === 0) return { url: IMAGE_PLACEHOLDER, slug: '#', name: 'Placeholder' };
        return pool[index % pool.length];
    };
    return (
        <div className="edgy-container">
            <GlobalBackground />
            <div className="edgy-bg-grid"></div>
            {/* <div className="edgy-chain-bg top"></div> */}
            <div className="edgy-chain-bg bottom"></div>

            <motion.div
                className="edgy-header"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            >
                <h1 className="edgy-title">
                    <span className="text-red">ARTWORK</span> SHOWCASE
                </h1>
            </motion.div>

            <div className="edgy-layout">
                {/* LEFT COLUMN: MODEL ART (Flip Cards) */}
                <motion.div
                    className="edgy-col edgy-col-model"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="edgy-col-title clickable" onClick={() => navigate('/category/model-art')}>
                        <span className="bark-icon">🎭</span> MODEL ART
                    </h2>

                    <div className="edgy-gallery-model">
                        <div className="edgy-box edgy-model-main slice-hover">
                            {modelPool.length > 0 ? (
                                <Link
                                    to={`/product/${getItem(modelPool, 0).slug}`}
                                    style={{ display: 'block', height: '100%' }}
                                >
                                    <img
                                        className="slice-img-bottom"
                                        src={getItem(modelPool, 1).url}
                                        alt={getItem(modelPool, 1).name}
                                    />
                                    <div className="slice-overlay">
                                        <img
                                            className="slice-img-top"
                                            src={getItem(modelPool, 0).url}
                                            alt={getItem(modelPool, 0).name}
                                        />
                                    </div>
                                    <div className="edgy-tag">MODEL</div>
                                </Link>
                            ) : (
                                <div style={{ height: '100%' }}>
                                    <img className="slice-img-bottom" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                    <div className="slice-overlay">
                                        <img className="slice-img-top" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="edgy-gallery-side">
                            <div className="edgy-box edgy-model-small slice-hover">
                                {modelPool.length > 2 ? (
                                    <Link
                                        to={`/product/${getItem(modelPool, 2).slug}`}
                                        style={{ display: 'block', height: '100%' }}
                                    >
                                        <img
                                            className="slice-img-bottom"
                                            src={getItem(modelPool, 3).url}
                                            alt={getItem(modelPool, 3).name}
                                        />
                                        <div className="slice-overlay">
                                            <img
                                                className="slice-img-top"
                                                src={getItem(modelPool, 2).url}
                                                alt={getItem(modelPool, 2).name}
                                            />
                                        </div>
                                    </Link>
                                ) : (
                                    <div style={{ height: '100%' }}>
                                        <img className="slice-img-bottom" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        <div className="slice-overlay">
                                            <img className="slice-img-top" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="edgy-box edgy-model-small slice-hover">
                                {modelPool.length > 4 ? (
                                    <Link
                                        to={`/product/${getItem(modelPool, 4).slug}`}
                                        style={{ display: 'block', height: '100%' }}
                                    >
                                        <img
                                            className="slice-img-bottom"
                                            src={getItem(modelPool, 5).url}
                                            alt={getItem(modelPool, 5).name}
                                        />
                                        <div className="slice-overlay">
                                            <img
                                                className="slice-img-top"
                                                src={getItem(modelPool, 4).url}
                                                alt={getItem(modelPool, 4).name}
                                            />
                                        </div>
                                    </Link>
                                ) : (
                                    <div style={{ height: '100%' }}>
                                        <img className="slice-img-bottom" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        <div className="slice-overlay">
                                            <img className="slice-img-top" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="edgy-text-block">
                        <div className="edgy-line" style={{ width: '80%' }}></div>
                        <div className="edgy-line" style={{ width: '90%' }}></div>
                        <div className="edgy-line" style={{ width: '70%' }}></div>
                        <div className="edgy-line" style={{ width: '85%' }}></div>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: ILLUSTRATION (Glitch cards) */}
                <motion.div
                    className="edgy-col edgy-col-illus"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h2
                        className="edgy-col-title text-red clickable"
                        onClick={() => navigate('/category/illustration')}
                    >
                        <span className="bark-icon">🩸</span> ILLUSTRATION
                    </h2>

                    <div className="edgy-gallery-illus">
                        {illusPool.length > 0 ? (
                            <Link
                                to={`/product/${getItem(illusPool, 0).slug}`}
                                className="edgy-box edgy-illus-main slice-hover"
                                style={{ flex: 2 }}
                            >
                                <img
                                    className="slice-img-bottom"
                                    src={getItem(illusPool, 1).url}
                                    alt={getItem(illusPool, 1).name}
                                />
                                <div className="slice-overlay">
                                    <img
                                        className="slice-img-top"
                                        src={getItem(illusPool, 0).url}
                                        alt={getItem(illusPool, 0).name}
                                    />
                                </div>
                                <div className="edgy-tag">ILLUST</div>
                            </Link>
                        ) : (
                            <div className="edgy-box edgy-illus-main slice-hover" style={{ flex: 2 }}>
                                <img className="slice-img-bottom" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                <div className="slice-overlay">
                                    <img className="slice-img-top" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                </div>
                            </div>
                        )}

                        <div className="edgy-illus-grid" style={{ flex: 1 }}>
                            <div className="edgy-box edgy-illus-small slice-hover">
                                {illusPool.length > 2 ? (
                                    <Link to={`/product/${getItem(illusPool, 2).slug}`}>
                                        <img
                                            className="slice-img-bottom"
                                            src={getItem(illusPool, 3).url}
                                            alt={getItem(illusPool, 3).name}
                                        />
                                        <div className="slice-overlay">
                                            <img
                                                className="slice-img-top"
                                                src={getItem(illusPool, 2).url}
                                                alt={getItem(illusPool, 2).name}
                                            />
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <img className="slice-img-bottom" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        <div className="slice-overlay">
                                            <img className="slice-img-top" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="edgy-box edgy-illus-small slice-hover">
                                {illusPool.length > 4 ? (
                                    <Link to={`/product/${getItem(illusPool, 4).slug}`}>
                                        <img
                                            className="slice-img-bottom"
                                            src={getItem(illusPool, 5).url}
                                            alt={getItem(illusPool, 5).name}
                                        />
                                        <div className="slice-overlay">
                                            <img
                                                className="slice-img-top"
                                                src={getItem(illusPool, 4).url}
                                                alt={getItem(illusPool, 4).name}
                                            />
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <img className="slice-img-bottom" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        <div className="slice-overlay">
                                            <img className="slice-img-top" src={IMAGE_PLACEHOLDER} alt="Placeholder" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="edgy-text-block">
                        <div className="edgy-line" style={{ width: '100%' }}></div>
                        <div className="edgy-line" style={{ width: '90%' }}></div>
                        <div className="edgy-line" style={{ width: '85%' }}></div>
                        <div className="edgy-line" style={{ width: '75%' }}></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EdgyHome;
