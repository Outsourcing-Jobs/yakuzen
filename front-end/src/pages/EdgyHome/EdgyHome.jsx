import React from 'react';
import './EdgyHome.css';
import GlobalBackground from '../../components/Default/GlobalBackground';

const EdgyHome = () => {
    return (
        <div className="edgy-container">
            <GlobalBackground />
            {/* Background Decorations */}
            <div className="edgy-bg-grid"></div>
            <div className="edgy-chain-bg top"></div>
            <div className="edgy-chain-bg bottom"></div>

            <div className="edgy-header">
                <h1 className="edgy-title">
                    <span className="text-red">ARTWORK</span> SHOWCASE
                </h1>
                <div className="edgy-spikes">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <span key={i} className="spike">▼</span>
                    ))}
                </div>
            </div>

            <div className="edgy-layout">
                {/* LEFT COLUMN: NORMAL */}
                <div className="edgy-col edgy-col-normal">
                    <h2 className="edgy-col-title">
                        <span className="bark-icon">🐕</span> NORMAL
                    </h2>

                    <div className="edgy-gallery-normal">
                        <div className="edgy-box edgy-sample">
                            <img src="https://framerusercontent.com/images/aPzYEPAdRz1sF28869k0vyLBts.jpg?width=700&height=943" alt="Normal Sample" />
                            <div className="edgy-tag">SAMPLE</div>
                        </div>
                        <div className="edgy-gallery-side">
                            <div className="edgy-box edgy-small">
                                <img src="https://framerusercontent.com/images/B5ltLWWMNvIgAzAesNvBfvwe69Y.jpg?width=700&height=943" alt="Normal 1" />
                            </div>
                            <div className="edgy-box edgy-small">
                                <img src="https://framerusercontent.com/images/6iD5FHyFNhEgxZEkDbQOGzSdrlQ.jpg?width=700&height=943" alt="Normal 2" />
                            </div>
                        </div>
                    </div>

                    <div className="edgy-text-block">
                        <div className="edgy-line" style={{ width: '80%' }}></div>
                        <div className="edgy-line" style={{ width: '90%' }}></div>
                        <div className="edgy-line" style={{ width: '70%' }}></div>
                        <div className="edgy-line" style={{ width: '85%' }}></div>
                        <div className="edgy-line" style={{ width: '60%' }}></div>
                        <div className="edgy-line" style={{ width: '95%' }}></div>
                    </div>
                </div>

                {/* RIGHT COLUMN: CHIBI */}
                <div className="edgy-col edgy-col-chibi">
                    <h2 className="edgy-col-title text-red">
                        <span className="bark-icon">🐾</span> CHIBI
                    </h2>

                    <div className="edgy-gallery-chibi">
                        <div className="edgy-box edgy-chibi-main">
                            <img src="https://framerusercontent.com/images/nBO5THno7iF7y7SsHfiRhBfzBY.jpg?width=700&height=943" alt="Chibi Sample" />
                            <div className="edgy-tag">CHIBI</div>
                        </div>
                    </div>

                    <div className="edgy-text-block">
                        <div className="edgy-line" style={{ width: '100%' }}></div>
                        <div className="edgy-line" style={{ width: '90%' }}></div>
                        <div className="edgy-line" style={{ width: '85%' }}></div>
                        <div className="edgy-line" style={{ width: '75%' }}></div>
                        <div className="edgy-line" style={{ width: '90%' }}></div>
                        <div className="edgy-line" style={{ width: '80%' }}></div>
                    </div>
                </div>
            </div>

            <div className="edgy-footer">
                <div className="edgy-chain-row">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="chain-link">⛓🔗⛓</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EdgyHome;
