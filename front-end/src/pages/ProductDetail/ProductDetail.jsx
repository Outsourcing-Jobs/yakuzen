import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalBackground from '../../components/Default/GlobalBackground';
import mockData from '../../data/mockArtworks.json';
import './ProductDetail.css';

const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat(currency === 'VND' ? 'vi-VN' : 'en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

const ProductDetail = () => {
    const { productId } = useParams();
    const product = mockData.find(item => item.id === productId);

    // Initialize the main image either to coverImage or first image in array
    const [activeImage, setActiveImage] = useState(product ? (product.coverImage || (product.images && product.images[0]) || '') : '');

    if (!product) {
        return (
            <div className="detail-container edgy-container">
                <GlobalBackground />
                <div className="no-data" style={{ marginTop: '5rem' }}>PRODUCT [{productId}] NOT FOUND</div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/model-art" className="detail-back-btn">RETURN TO HOME</Link>
                </div>
            </div>
        );
    }

    // Prepare list of gallery images (fallback strictly to cover if images array missing)
    const galleryItems = (product.images && product.images.length > 0) ? product.images : [product.coverImage];

    return (
        <div className="detail-container edgy-container">
            <GlobalBackground />
            <div className="edgy-bg-grid"></div>

            <div className="detail-nav">
                <Link to={`/category/${product.category}`} className="detail-back-btn">
                    ◄ BACK TO {product.category.replace('-', ' ').toUpperCase()}
                </Link>
            </div>

            <div className="detail-content">
                {/* Left Side: Gallery */}
                <motion.div
                    className="detail-gallery"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="main-image-box edgy-box-dt">
                        <img src={activeImage} alt={product.title} />
                    </div>

                    {galleryItems.length > 1 && (
                        <div className="thumbnail-list">
                            {galleryItems.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`thumb-box edgy-box-dt ${activeImage === img ? 'active' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <img src={img} alt={`${product.title} thumb ${idx}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Right Side: Product Info */}
                <motion.div
                    className="detail-info edgy-col"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="info-header">
                        <div className="edgy-tag static-tag">{product.category.toUpperCase()}</div>
                        <h1 className="detail-title text-red">{product.title}</h1>
                        <div className="detail-id">ID: {product.id}</div>
                    </div>

                    <div className="detail-desc">
                        <p>{product.description}</p>
                    </div>

                    <div className="detail-pricing">
                        <div className="price-box">
                            <span className="price-label">VNĐ</span>
                            <span className="price-value">{formatCurrency(product.priceVnd, 'VND')}</span>
                        </div>
                        <div className="price-box usd">
                            <span className="price-label">USD</span>
                            <span className="price-value">{formatCurrency(product.priceUsd, 'USD')}</span>
                        </div>
                    </div>

                    <button className="edgy-button buy-btn">
                        <span>ACQUIRE ASSET</span>
                    </button>

                    <div className="edgy-chain-row detail-chain">
                        {/* ⛓🔗⛓🔗⛓ */}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
