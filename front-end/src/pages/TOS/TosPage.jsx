import React, { useState, useEffect } from 'react';
import './Tos.css';
import GlobalBackground from '../../components/Default/GlobalBackground';

// ── Data ──────────────────────────────────────────────
const TOS_SECTIONS = [
    {
        num: '01',
        title: 'Acceptance of Terms',
        jp: '利用規約への同意',
        icon: '⛓️',
        content: (
            <>
                <p>
                    By accessing or using this platform you confirm that you have read, understood, and agree to be
                    bound by these Terms of Service in their entirety. If you do not agree, please{' '}
                    <strong>exit immediately</strong>.
                </p>
                <p>
                    We reserve the right to modify these terms at any time. Continued use after changes constitutes
                    acceptance. It is your responsibility to review this document periodically.
                </p>
                <div className="tos-tags">
                    {['#binding-contract', '#all-users', '#no-exceptions'].map(t => (
                        <span className="tos-tag" key={t}>
                            {t}
                        </span>
                    ))}
                </div>
            </>
        ),
    },
    {
        num: '02',
        title: 'User Conduct',
        jp: 'ユーザーの行動規範',
        icon: '🐕',
        content: (
            <>
                <p>
                    Users must not engage in any behavior that is unlawful, harmful, threatening, abusive, harassing, or
                    otherwise objectionable. This includes but is not limited to: spam, malware distribution,
                    impersonation, or any act that disrupts the integrity of the platform.
                </p>
                <div className="tos-callout">
                    <span className="tos-callout-icon">⚠️</span>
                    <p>
                        Violations may result in <strong>immediate permanent suspension</strong> without prior notice or
                        refund. We bite back.
                    </p>
                </div>
                <p>You are solely responsible for all content you post, upload, or transmit through our services.</p>
            </>
        ),
    },
    {
        num: '03',
        title: 'Intellectual Property',
        jp: '知的財産権',
        icon: '🎨',
        content: (
            <>
                <p>
                    All original content, artwork, logos, and branding elements on this platform are the exclusive
                    property of the service owner and are protected under applicable copyright and trademark laws.
                </p>
                <p>
                    You may not reproduce, distribute, or create derivative works from any platform content without{' '}
                    <strong>explicit written permission</strong>. Unauthorized use will be pursued to the fullest extent
                    of the law.
                </p>
                <div className="tos-tags">
                    {['#copyright', '#no-resale', '#art-protected'].map(t => (
                        <span className="tos-tag" key={t}>
                            {t}
                        </span>
                    ))}
                </div>
            </>
        ),
    },
    {
        num: '04',
        title: 'Privacy & Data',
        jp: 'プライバシーとデータ',
        icon: '🔐',
        content: (
            <>
                <p>
                    We collect only the data necessary to provide and improve our services. Your personal information
                    will never be sold to third parties. Refer to our <strong>Privacy Policy</strong> for complete
                    details on how your data is stored, processed, and protected.
                </p>
                <p>
                    By using the platform you consent to the collection of usage analytics, cookies, and device
                    information as described therein.
                </p>
            </>
        ),
    },
    {
        num: '05',
        title: 'Limitation of Liability',
        jp: '責任の制限',
        icon: '🛡️',
        content: (
            <>
                <p>
                    To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your use of — or inability to use — the platform.
                </p>
                <div className="tos-callout">
                    <span className="tos-callout-icon">💀</span>
                    <p>
                        The platform is provided <strong>"as is"</strong> without warranties of any kind, express or
                        implied. Use at your own risk.
                    </p>
                </div>
            </>
        ),
    },
    {
        num: '06',
        title: 'Termination',
        jp: 'アカウントの終了',
        icon: '⚔️',
        content: (
            <>
                <p>
                    We reserve the right to suspend or terminate your access to the platform at our sole discretion,
                    with or without cause, and without prior notice.
                </p>
                <p>
                    Upon termination all rights granted to you will immediately cease. Sections of these terms that by
                    their nature should survive termination shall continue in full force and effect.
                </p>
                <div className="tos-tags">
                    {['#no-refund', '#immediate-effect', '#all-rights-reserved'].map(t => (
                        <span className="tos-tag" key={t}>
                            {t}
                        </span>
                    ))}
                </div>
            </>
        ),
    },
];

const TosPage = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`tos-container ${loaded ? 'is-loaded' : ''}`}>
            <GlobalBackground />
            <div className="tos-background-ambient"></div>

            <header className="tos-header-clean">
                <div className="tos-header-watermark">規約</div>
                <div className="tos-header-content">
                    {/* <div className="tos-badge">v2.0 • OFFICIAL DOCUMENT</div> */}
                    <h1 className="tos-title">
                        TERMS <span>OF SERVICE</span>
                    </h1>
                    <p className="tos-subtitle">Please read these terms carefully before proceeding.</p>
                </div>
            </header>

            <main className="tos-main-content">
                <div className="tos-meta-info fade-in-up">
                    <div className="meta-item">
                        <span className="pulse-dot"></span>
                        <span>LAST UPDATED: 2025-06-01</span>
                    </div>
                    <div className="meta-item effective">EFFECTIVE IMMEDIATELY</div>
                </div>

                <div className="tos-single-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {TOS_SECTIONS.map((s, i) => (
                        <div key={s.num} className="tos-content-block">
                            <div className="tos-block-header">
                                <span className="tos-block-num">{s.num}</span>
                                <div className="tos-block-title-wrapper">
                                    <h2 className="tos-block-title">{s.icon} {s.title}</h2>
                                    <span className="tos-block-jp">{s.jp}</span>
                                </div>
                            </div>
                            <div className="tos-block-body">
                                {s.content}
                            </div>
                            {i < TOS_SECTIONS.length - 1 && <hr className="tos-divider" />}
                        </div>
                    ))}
                </div>

                {/* <div className="tos-agreement-footer fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="agreement-icon">📜</div>
                    <p>
                        These terms constitute the <strong>entire agreement</strong> between you and us regarding use of
                        the service. If any provision is found invalid, remaining provisions continue in full force.
                    </p>
                </div> */}
            </main>

            <footer className="tos-simple-footer">
                <div className="footer-logo">◈ YAKUZEN ◈</div>
                <p>© 2026 ALL RIGHTS RESERVED</p>
            </footer>
        </div>
    );
};

export default TosPage;
