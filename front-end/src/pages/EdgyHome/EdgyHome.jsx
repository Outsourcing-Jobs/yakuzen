import React from 'react';
import './EdgyHome.css';
import GlobalBackground from '../../components/Default/GlobalBackground';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EdgyHome = () => {
    const navigate = useNavigate();

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
                        <div className="edgy-box flip-container">
                            <div className="flipper">
                                <div className="front">
                                    <img src="https://framerusercontent.com/images/aPzYEPAdRz1sF28869k0vyLBts.jpg?width=700&height=943" alt="Model Art 1 Front" />
                                    <div className="edgy-tag">MODEL</div>
                                </div>
                                <div className="back">
                                    <img src="https://framerusercontent.com/images/B5ltLWWMNvIgAzAesNvBfvwe69Y.jpg?width=700&height=943" alt="Model Art 1 Back" />
                                    <div className="edgy-tag">ART</div>
                                </div>
                            </div>
                        </div>

                        <div className="edgy-gallery-side">
                            <div className="edgy-box flip-container small">
                                <div className="flipper">
                                    <div className="front">
                                        <img src="https://framerusercontent.com/images/6iD5FHyFNhEgxZEkDbQOGzSdrlQ.jpg?width=700&height=943" alt="Model Art 2 Front" />
                                    </div>
                                    <div className="back">
                                        <img src="https://framerusercontent.com/images/nBO5THno7iF7y7SsHfiRhBfzBY.jpg?width=700&height=943" alt="Model Art 2 Back" />
                                    </div>
                                </div>
                            </div>
                            <div className="edgy-box flip-container small">
                                <div className="flipper">
                                    <div className="front">
                                        <img src="https://framerusercontent.com/images/nBO5THno7iF7y7SsHfiRhBfzBY.jpg?width=700&height=943" alt="Model Art 3 Front" />
                                    </div>
                                    <div className="back">
                                        <img src="https://framerusercontent.com/images/aPzYEPAdRz1sF28869k0vyLBts.jpg?width=700&height=943" alt="Model Art 3 Back" />
                                    </div>
                                </div>
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
                    <h2 className="edgy-col-title text-red clickable" onClick={() => navigate('/category/illustration')}>
                        <span className="bark-icon">🩸</span> ILLUSTRATION
                    </h2>

                    <div className="edgy-gallery-illus">
                        <div className="edgy-box edgy-illus-main slice-hover" style={{ flex: 2 }}>
                            <img className="slice-img-bottom" src="https://framerusercontent.com/images/B5ltLWWMNvIgAzAesNvBfvwe69Y.jpg?width=700&height=943" alt="Illustration Reveal 1" />
                            <div className="slice-overlay">
                                <img className="slice-img-top" src="https://framerusercontent.com/images/nBO5THno7iF7y7SsHfiRhBfzBY.jpg?width=700&height=943" alt="Illustration" />
                            </div>
                            <div className="edgy-tag">ILLUST</div>
                        </div>

                        <div className="edgy-illus-grid" style={{ flex: 1 }}>
                            <div className="edgy-box edgy-illus-small slice-hover">
                                <img className="slice-img-bottom" src="https://framerusercontent.com/images/6iD5FHyFNhEgxZEkDbQOGzSdrlQ.jpg?width=700&height=943" alt="Illust Reveal 2" />
                                <div className="slice-overlay">
                                    <img className="slice-img-top" src="https://framerusercontent.com/images/B5ltLWWMNvIgAzAesNvBfvwe69Y.jpg?width=700&height=943" alt="Illust 1" />
                                </div>
                            </div>
                            <div className="edgy-box edgy-illus-small slice-hover">
                                <img className="slice-img-bottom" src="https://framerusercontent.com/images/aPzYEPAdRz1sF28869k0vyLBts.jpg?width=700&height=943" alt="Illust Reveal 3" />
                                <div className="slice-overlay">
                                    <img className="slice-img-top" src="https://framerusercontent.com/images/6iD5FHyFNhEgxZEkDbQOGzSdrlQ.jpg?width=700&height=943" alt="Illust 2" />
                                </div>
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
