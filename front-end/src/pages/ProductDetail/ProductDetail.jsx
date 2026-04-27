import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalBackground from '../../components/Default/GlobalBackground';
import axios from '../../utils/axios';
import useExchangeRate from '../../hooks/useExchangeRate';
import './ProductDetail.css';
import SafeImage from '../../components/Default/SafeImage';

const formatPrice = val => {
    if (!val) return '$0.00';
    const s = String(val);
    if (s.startsWith('$')) return s;
    // If it's just a number, we might want to ensure two decimal places if possible,
    // but since it's a string, we'll just prepend $ for simplicity if it doesn't have it.
    return `$${s}`;
};

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const { rate: exchangeRate } = useExchangeRate();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/products/slug/${slug}`);
                const data = res.data;
                const mappedProduct = {
                    id: data._id,
                    title: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category?.slug || 'unknown',
                    categoryName: data.category?.name || 'Unknown',
                    images: data.images?.map(img => img.url) || [],
                    coverImage: data.images && data.images.length > 0 ? data.images[0].url : '',
                };
                setProduct(mappedProduct);
                setActiveImage(mappedProduct.coverImage || (mappedProduct.images && mappedProduct.images[0]) || '');
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="detail-container edgy-container">
                <GlobalBackground />
                <div className="loading-state" style={{ marginTop: '10rem', fontSize: '2rem', textAlign: 'center' }}>
                    REVEALING ASSET DATA...
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="detail-container edgy-container">
                <GlobalBackground />
                <div className="no-data" style={{ marginTop: '5rem' }}>
                    PRODUCT [{slug}] NOT FOUND
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/" className="detail-back-btn">
                        RETURN TO HOME
                    </Link>
                </div>
            </div>
        );
    }

    // Prepare list of gallery images (fallback strictly to cover if images array missing)
    const galleryItems = product.images && product.images.length > 0 ? product.images : [product.coverImage];

    return (
        <div className="detail-container edgy-container">
            <GlobalBackground />
            <div className="edgy-bg-grid"></div>

            <div className="detail-nav">
                <Link to={`/category/${product.category}`} className="detail-back-btn">
                    ◄ BACK TO {product.categoryName.toUpperCase()}
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
                        <SafeImage src={activeImage} alt={product.title} />
                    </div>

                    {galleryItems.length > 1 && (
                        <div className="thumbnail-list">
                            {galleryItems.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`thumb-box edgy-box-dt ${activeImage === img ? 'active' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <SafeImage src={img} alt={`${product.title} thumb ${idx}`} />
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
                        <div className="edgy-tag static-tag">{product.categoryName.toUpperCase()}</div>
                        <h1 className="detail-title text-red">{product.title}</h1>
                        {/* <div className="detail-id">ID: {product.id}</div> */}
                    </div>

                    <div className="detail-pricing">
                        <div className="price-box usd">
                            <span className="price-label">Price</span>
                            <span className="price-value">{product.price}</span>
                        </div>
                        {exchangeRate && (
                            <div className="exchange-rate-info">
                                <span className="rate-text">
                                    $1 ≈ {new Intl.NumberFormat('vi-VN').format(exchangeRate)} VND
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="detail-desc">
                        <p>{product.description}</p>
                    </div>

                    <button className="edgy-button buy-btn">
                        <span>ACQUIRE ASSET</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
