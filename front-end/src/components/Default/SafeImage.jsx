import React, { useState } from 'react';
import './SafeImage.css';

const SafeImage = ({ src, alt, className, style, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`safe-image-container ${className || ''}`} style={style}>
            {isLoading && (
                <div className="safe-image-loader">
                    <div className="safe-image-spinner"></div>
                </div>
            )}
            
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{ 
                        display: isLoading ? 'none' : 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    {...props}
                />
            ) : (
                <div className="safe-image-error">
                    <span>IMAGE NOT FOUND</span>
                </div>
            )}
        </div>
    );
};

export default SafeImage;
