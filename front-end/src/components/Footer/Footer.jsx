import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, YoutubeOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import { useNavigate, useParams } from 'react-router-dom';

const { Footer } = Layout;

const AppFooter = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const navigate = useNavigate();

    const handlePolicy = () => {
        navigate(`/${lang}/policy`);
    };

    const handleHome = () => {
        navigate(`/${lang}/`);
    };

    const handleProduct = () => {
        navigate(`/${lang}/all-product`);
    };

    const handleCate = () => {
        navigate(`/${lang}/`);
    };
    return (
        <Footer className="footer">
            <div className="footer-container">
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <div className="footer-section">
                            <h3 className="footer-logo">VietGlobal</h3>
                            <p>{t('description')}</p>
                            <div className="footer-socials">
                                <FacebookOutlined />
                                <YoutubeOutlined />
                                <MailOutlined />
                            </div>
                        </div>
                    </Col>

                    {/* Navigation Links */}
                    <Col xs={12} sm={8} md={4} lg={4}>
                        <div className="footer-section">
                            <h4>{t('links.title')}</h4>
                            <ul className="footer-links">
                                <li onClick={() => handleHome()}>{t('links.home')}</li>
                                <li onClick={() => handleProduct()}>{t('links.products')}</li>
                                <li onClick={() => handleCate()}>{t('links.categories')}</li>
                                <li onClick={() => handlePolicy()}>{t('policies.title')}</li>
                            </ul>
                        </div>
                    </Col>

                    {/* Policies */}
                    <Col xs={10} sm={6} md={4} lg={4}>
                        <div className="footer-section">
                            <h4>{t('followUs')}</h4>
                            <ul className="footer-links">
                                <li>
                                    {' '}
                                    <FacebookOutlined />
                                    &nbsp; Facebook
                                </li>
                                <li>
                                    {' '}
                                    <YoutubeOutlined />
                                    &nbsp; Youtube
                                </li>
                                <li>
                                    {' '}
                                    <MailOutlined />
                                    &nbsp; Email
                                </li>
                            </ul>
                        </div>
                    </Col>

                    {/* Contact Info */}
                    <Col xs={14} sm={10} md={7} lg={7}>
                        <div className="footer-section">
                            <h4>{t('contact.title')}</h4>
                            <div className="footer-contact">
                                <p>
                                    <EnvironmentOutlined />
                                    <span>{t('contact.address')}</span>
                                </p>
                                <p>
                                    <PhoneOutlined />
                                    <span>{t('contact.phone')}</span>
                                </p>
                                <p>
                                    <MailOutlined />
                                    <span>{t('contact.email')}</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} VietGlobal</p>
                </div>
            </div>
        </Footer>
    );
};

export default AppFooter;
