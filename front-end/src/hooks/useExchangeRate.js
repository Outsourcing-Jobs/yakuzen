import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useExchangeRate = () => {
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await axios.get('/settings/exchange_rate');
                setRate(response.data.value);
            } catch (err) {
                console.error('Exchange Rate Error:', err);
                setError(err.message);
                // Fallback rate
                setRate(25430); 
            } finally {
                setLoading(false);
            }
        };

        fetchRate();
    }, []);

    const updateRateInState = (newRate) => {
        setRate(newRate);
    };

    return { rate, loading, error, updateRateInState };
};

export default useExchangeRate;
