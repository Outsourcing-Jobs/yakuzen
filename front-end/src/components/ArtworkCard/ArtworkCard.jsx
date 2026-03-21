import React from 'react';
import { Link } from 'react-router-dom';
import './ArtworkCard.css';

const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat(currency === 'VND' ? 'vi-VN' : 'en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

const ArtworkCard = ({ item }) => {
    return (
        <Link to={`/product/${item.id}`} className="artwork-card-link">
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
                        <span className="price-vnd">{formatCurrency(item.priceVnd, 'VND')}</span>
                        <span className="price-sep"> // </span>
                        <span className="price-usd">{formatCurrency(item.priceUsd, 'USD')}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArtworkCard;
