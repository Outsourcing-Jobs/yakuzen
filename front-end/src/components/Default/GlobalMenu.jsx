import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './GlobalMenu.css';

const GlobalMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Close menu automatically when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { path: '/', label: 'HOME', jp: 'ホーム' },
        { path: '/tos', label: 'T.O.S', jp: '利用規約' },
        { path: '/login', label: 'LOGIN', jp: 'ログイン' },
        { path: '/signup', label: 'SIGN UP', jp: '新規登録' },
    ];

    return (
        <>
            <button 
                className={`global-menu-btn ${isOpen ? 'open' : ''}`} 
                onClick={toggleMenu} 
                aria-label="Toggle Navigation Menu"
            >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </button>

            <nav className={`global-menu-overlay ${isOpen ? 'visible' : ''}`}>
                <div className="menu-backdrop" onClick={closeMenu}></div>
                
                <div className="menu-content">
                    <div className="menu-header">
                        <span className="menu-brand">◈ YAKUZEN</span>
                    </div>

                    <ul className="menu-links">
                        {navLinks.map((link, idx) => (
                            <li key={link.path} style={{ transitionDelay: `${isOpen ? idx * 0.08 : 0}s` }}>
                                <Link 
                                    to={link.path} 
                                    className={`menu-link ${location.pathname === link.path ? 'active' : ''}`}
                                    onClick={closeMenu}
                                >
                                    <div className="menu-link-left">
                                        <span className="link-num">0{idx + 1}</span>
                                    </div>
                                    <div className="menu-link-right">
                                        <span className="link-label">{link.label}</span>
                                        <span className="link-jp">{link.jp}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="menu-footer">
                        <p>© 2026 YAKUZEN. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default GlobalMenu;
