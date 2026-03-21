import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalBackground from '../../components/Default/GlobalBackground';
import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';
import mockData from '../../data/mockArtworks.json';
import './CategoryList.css';

const CategoryList = () => {
    const { categoryId } = useParams();
    
    // Format title safely
    const formattedTitle = categoryId ? categoryId.replace('-', ' ').toUpperCase() : 'ALL ARTWORKS';

    // Filter data
    const artworks = mockData.filter(item => item.category === categoryId);

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
                {artworks.length > 0 ? (
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
                        {artworks.map(item => (
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
