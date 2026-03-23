import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalBackground from '../../components/Default/GlobalBackground';
import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';
import axios from '../../utils/axios';
import './CategoryList.css';

const CategoryList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Format title safely
    const formattedTitle = categoryId ? categoryId.replace(/-/g, ' ').toUpperCase() : 'ALL ARTWORKS';

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/products?category=${categoryId}`);
                const mappedData = res.data.map(product => ({
                    id: product._id,
                    title: product.name,
                    description: product.description,
                    priceVnd: product.price,
                    priceUsd: Math.round((product.price / 25000) * 100) / 100,
                    coverImage: product.images && product.images.length > 0 ? product.images[0].url : '',
                    category: categoryId,
                    slug: product.slug,
                    images: product.images?.map(img => img.url) || []
                }));
                setProducts(mappedData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [categoryId]);

    return (
        <div className="cat-container edgy-container">
            <GlobalBackground />
            <div className="edgy-bg-grid"></div>

            <div className="cat-header edgy-header" style={{ position: 'relative', borderBottom: 'none' }}>
                <Link to="/" className="back-btn">◄ BACK TO HOME</Link>
                <h1 className="edgy-title text-red" style={{ fontSize: '4rem', marginTop: '2rem' }}>{formattedTitle}</h1>
                <p className="cat-subtitle">BROWSE OUR EXCLUSIVE COLLECTION</p>
            </div>

            <div className="cat-content">
                {loading ? (
                    <div className="loading-state">LOADING EXCLUSIVE WORKS...</div>
                ) : products.length > 0 ? (
                    <motion.div 
                        className="cat-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {products.map(item => (
                            <motion.div key={item.id} variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                <ArtworkCard item={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="no-data">NO ARTWORKS FOUND FOR [{formattedTitle}]</div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
