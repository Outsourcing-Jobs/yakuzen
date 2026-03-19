import React, { useState } from 'react';
import './TosPageV2.css';

const TOS_SECTIONS = [
    {
        num: 'I',
        title: 'Acceptance of Terms',
        jp: '利用規約への同意',
        icon: '⛓',
        content: (
            <>
                <p>
                    By accessing or using this platform you confirm that you have read, understood, and agreed to be
                    bound by these Terms of Service in full. If you do not agree, please{' '}
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
        num: 'II',
        title: 'User Conduct',
        jp: 'ユーザーの行動規範',
        icon: '🐕',
        content: (
            <>
                <p>
                    Users must not engage in any behavior that is unlawful, harmful, threatening, or abusive. This
                    includes spam, malware distribution, impersonation, or any act that disrupts the integrity of the
                    platform.
                </p>
                <div className="tos-callout">
                    <span className="tos-callout-icon">◈</span>
                    <p>
                        Violations may result in <strong>immediate permanent suspension</strong> without prior notice or
                        refund. We do not negotiate.
                    </p>
                </div>
                <p>You are solely responsible for all content you post, upload, or transmit through our services.</p>
            </>
        ),
    },
    {
        num: 'III',
        title: 'Intellectual Property',
        jp: '知的財産権',
        icon: '✦',
        content: (
            <>
                <p>
                    All original content, artwork, logos, and branding on this platform are the exclusive property of
                    the service owner and protected under applicable copyright and trademark law.
                </p>
                <p>
                    You may not reproduce, distribute, or create derivative works without{' '}
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
        num: 'IV',
        title: 'Privacy & Data',
        jp: 'プライバシーとデータ',
        icon: '◉',
        content: (
            <>
                <p>
                    We collect only the data necessary to provide and improve our services. Your personal information
                    will <strong>never be sold</strong> to third parties. Refer to our Privacy Policy for full details.
                </p>
                <p>
                    By using the platform you consent to the collection of usage analytics, cookies, and device
                    information as described therein.
                </p>
            </>
        ),
    },
    {
        num: 'V',
        title: 'Limitation of Liability',
        jp: '責任の制限',
        icon: '⚔',
        content: (
            <>
                <p>
                    To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or
                    consequential damages arising from your use of the platform.
                </p>
                <div className="tos-callout">
                    <span className="tos-callout-icon">▲</span>
                    <p>
                        The platform is provided <strong>"as is"</strong> without warranties of any kind, express or
                        implied. Use at your own risk.
                    </p>
                </div>
            </>
        ),
    },
    {
        num: 'VI',
        title: 'Termination',
        jp: 'アカウントの終了',
        icon: '◈',
        content: (
            <>
                <p>
                    We reserve the right to suspend or terminate your access at our sole discretion, with or without
                    cause and without prior notice.
                </p>
                <p>
                    Upon termination all rights granted to you will immediately cease. Provisions that by nature survive
                    termination will continue in full force and effect.
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

// ── Rivet row ────────────────────────────────────────
const RivetRow = ({ count = 50 }) => {
    const items = [];
    for (let i = 0; i < count; i++) {
        if (i > 0 && i % 5 === 0) {
            items.push(<span key={`g-${i}`} className="tos-rivet-gap" />);
        }
        const isGold = i % 7 === 3;
        items.push(<span key={i} className={`tos-rivet${isGold ? ' gold' : ''}`} />);
    }
    return (
        <div className="tos-rivets" aria-hidden="true">
            {items}
        </div>
    );
};

// ── Ornament divider ─────────────────────────────────
const Ornament = ({ label = '§' }) => (
    <div className="tos-ornament" aria-hidden="true">
        <span className="tos-ornament-line" />
        <span className="tos-ornament-center">
            <span className="tos-ornament-dot" />
            <span>{label}</span>
            <span className="tos-ornament-dot" />
        </span>
        <span className="tos-ornament-line" />
    </div>
);

// ── Accordion section ─────────────────────────────────
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
                <span style={{ flex: 1 }}>
                    <div className="tos-section-title">{section.title}</div>
                    <div className="tos-section-jp">{section.jp}</div>
                </span>
                <span className="tos-section-icon" aria-hidden="true">
                    {section.icon}
                </span>
                <span className="tos-toggle" aria-hidden="true">
                    +
                </span>
            </div>
            <div className="tos-section-body" aria-hidden={!open}>
                <div className="tos-section-inner">{section.content}</div>
            </div>
        </div>
    );
};

// ── Main page ─────────────────────────────────────────
const TosPageV2 = () => {
    return (
        <div className="tos-root">
            {/* HEADER */}
            <header className="tos-header">
                <div className="tos-kanji-bg" aria-hidden="true">
                    規約
                </div>
                <div className="tos-header-inner">
                    <div className="tos-emblem" aria-hidden="true">
                        🐾
                    </div>
                    <div className="tos-header-text">
                        <p className="tos-eyebrow">◈ &nbsp;Official Document · Version 2.0</p>
                        <h1 className="tos-main-title">
                            Terms
                            <span>of Service</span>
                        </h1>
                        <p className="tos-subtitle">利用規約 — Read before you proceed</p>
                    </div>
                </div>
                <div className="tos-rule" aria-hidden="true">
                    <span className="tos-rule-line" />
                    <span className="tos-rule-diamond" />
                    <span
                        className="tos-rule-line"
                        style={{ width: 40, background: 'linear-gradient(270deg, rgba(212,168,67,0.3), transparent)' }}
                    />
                </div>
            </header>

            <div className="tos-gold-bar" />
            <RivetRow count={55} />

            {/* CONTENT */}
            <main className="tos-content">
                <div className="tos-meta">
                    <span>LAST UPDATED: 2025-06-01</span>
                    <span className="tos-meta-sep">·</span>
                    <span>EFFECTIVE IMMEDIATELY</span>
                    <span className="tos-meta-sep">·</span>
                    <span>6 CLAUSES</span>
                </div>

                {TOS_SECTIONS.map((s, i) => (
                    <React.Fragment key={s.num}>
                        <TosSection section={s} />
                        {(i === 1 || i === 3) && <Ornament label={i === 1 ? '§§' : '§§§'} />}
                    </React.Fragment>
                ))}

                <Ornament label="— END —" />

                <div className="tos-callout" style={{ marginTop: 4 }}>
                    <span className="tos-callout-icon">◇</span>
                    <p>
                        These terms constitute the <strong>entire agreement</strong> between you and us. If any
                        provision is found invalid, remaining provisions continue in full force and effect.
                    </p>
                </div>
            </main>

            <RivetRow count={55} />
            <div className="tos-gold-bar" />

            {/* FOOTER */}
            <footer className="tos-footer">
                <div className="tos-footer-emblem">
                    <span className="tos-footer-hline" />
                    <span className="tos-footer-mark">◈ &nbsp;Dark Guild&nbsp; ◈</span>
                    <span className="tos-footer-hline" />
                </div>
                <p className="tos-footer-copy">
                    © 2025 All Rights Reserved
                    <br />
                    Unauthorized use will be pursued to the fullest extent permitted by law
                </p>
                <div className="tos-footer-rivets" aria-hidden="true">
                    {Array.from({ length: 13 }).map((_, i) => (
                        <span key={i} className={`tos-rivet${i === 3 || i === 9 ? ' gold' : ''}`} />
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default TosPageV2;
