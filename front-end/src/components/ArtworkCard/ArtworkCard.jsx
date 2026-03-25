import React from 'react';
import { Link } from 'react-router-dom';
import './ArtworkCard.css';

const formatPrice = (val) => {
    if (!val) return '$0.00';
    const s = String(val);
    if (s.startsWith('$')) return s;
    return `$${s}`;
};

const ArtworkCard = ({ item }) => {
    return (
        <Link to={`/product/${item.slug}`} className="artwork-card-link">
            <div className="artwork-card edgy-box">
                <div className="card-img-wrapper">
                    <img src={item.coverImage} alt={item.title} />
                    {/* <div className="card-overlay">
                        <span className="view-text">VIEW DETAILS 👁</span>
                    </div> */}
                </div>
                <div className="card-info">
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-prices">
                        <span className="price-usd">{formatPrice(item.price)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArtworkCard;
