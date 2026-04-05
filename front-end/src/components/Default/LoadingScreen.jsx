import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="loading-content">
                <div className="loading-logo">
                    <motion.div
                        className="loading-circle"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                            boxShadow: [
                                "0 0 20px rgba(255, 42, 42, 0.3)",
                                "0 0 50px rgba(255, 42, 42, 0.6)",
                                "0 0 20px rgba(255, 42, 42, 0.3)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <span className="loading-kanji">読</span>
                    </motion.div>
                    <div className="loading-brush" />
                </div>

                <div className="loading-text-wrap">
                    <h2 className="loading-title">YAKUZEN PORTFOLIO</h2>
                    <div className="loading-status">
                        <span className="dot-pulse"></span>
                        <p>Máy chủ đang tải... Vui lòng đợi một lát</p>
                    </div>
                    <p className="loading-sub">Server is waking up from sleep mode</p>
                </div>
            </div>

            <div className="loading-bg-deco">
                <div className="grid-line" />
                <div className="grid-line" />
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
