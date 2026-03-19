import React, { useState } from 'react';
import './Tos.css';

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

// ── Chain component ──────────────────────────────────
const ChainStrip = ({ count = 40 }) => (
    <div className="tos-chain-strip" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="tos-chain-link" />
        ))}
    </div>
);

// ── Stud bar component ───────────────────────────────
const StudBar = ({ count = 60 }) => (
    <div className="tos-stud-bar" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} className="tos-stud" />
        ))}
    </div>
);

// ── Section accordion ────────────────────────────────
const TosSection = ({ section }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`tos-section${open ? ' open' : ''}`}>
            <div
                className="tos-section-header"
                onClick={() => setOpen(v => !v)}
                role="button"
                aria-expanded={open}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setOpen(v => !v)}
            >
                <span className="tos-section-num">{section.num}</span>
                <span>
                    <div className="tos-section-title">
                        {section.icon} {section.title}
                    </div>
                    <div className="tos-section-jp">{section.jp}</div>
                </span>
                <span className="tos-toggle-icon" aria-hidden="true">
                    ✕
                </span>
            </div>
            <div className="tos-section-body" aria-hidden={!open}>
                {section.content}
            </div>
        </div>
    );
};

// ── Divider ──────────────────────────────────────────
const Divider = ({ icon = '✦' }) => (
    <div className="tos-divider" aria-hidden="true">
        <span className="tos-divider-line" />
        <span className="tos-divider-icon">{icon}</span>
        <span className="tos-divider-line right" />
    </div>
);

// ── Main Page ────────────────────────────────────────
const TosPage = () => {
    return (
        <div className="tos-root">
            {/* HEADER */}
            <header className="tos-header">
                <div className="tos-kanji-bg" aria-hidden="true">
                    規約
                </div>
                <div className="tos-header-inner">
                    <div className="tos-icon-wrap" aria-hidden="true">
                        🐾
                    </div>
                    <div className="tos-header-text">
                        <p className="tos-eyebrow">◈ OFFICIAL DOCUMENT · v2.0</p>
                        <h1 className="tos-main-title">
                            TERMS <span>OF SERVICE</span>
                        </h1>
                        <p className="tos-subtitle">利用規約 — READ BEFORE YOU PROCEED</p>
                    </div>
                </div>
                {/* <ChainStrip count={50} /> */}
            </header>

            {/* STUD BAR */}
            {/* <StudBar count={80} /> */}

            {/* CONTENT */}
            <main className="tos-content">
                {/* Meta bar */}
                <div className="tos-meta-bar">
                    <span className="dot" />
                    <span>LAST UPDATED: 2025-06-01</span>
                    <span style={{ marginLeft: 'auto' }}>EFFECTIVE IMMEDIATELY</span>
                </div>

                {/* Accordion sections */}
                {TOS_SECTIONS.map((s, i) => (
                    <React.Fragment key={s.num}>
                        <TosSection section={s} />
                        {i < TOS_SECTIONS.length - 1 && i % 2 === 1 && <Divider icon={i === 1 ? '🐾' : '⛓'} />}
                    </React.Fragment>
                ))}

                <Divider icon="⚔️" />

                {/* Bottom notice */}
                <div className="tos-callout" style={{ marginTop: 8 }}>
                    <span className="tos-callout-icon">📜</span>
                    <p>
                        These terms constitute the <strong>entire agreement</strong> between you and us regarding use of
                        the service. If any provision is found invalid, remaining provisions continue in full force.
                    </p>
                </div>
            </main>

            {/* STUD BAR (bottom) */}
            {/* <StudBar count={80} /> */}

            {/* FOOTER */}
            <footer className="tos-footer">
                <div className="tos-footer-logo">◈ YAKUZEN ◈</div>
                <p className="tos-footer-text">© 2026 ALL RIGHTS RESERVED · UNAUTHORIZED USE WILL BE HUNTED DOWN</p>
                <div className="tos-footer-studs" aria-hidden="true">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <span key={i} className="tos-footer-stud" />
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default TosPage;
