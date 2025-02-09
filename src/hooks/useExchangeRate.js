import { useState, useEffect } from 'react';
import {
 INITIAL_EXCHANGE_RATE,
 UPDATE_INTERVAL,
 RATE_VARIATION_RANGE,
 FIXED_RATE_VARIATION_THRESHOLD
} from '../constants/config';
import { generateRandomVariation } from '../utils/currency';

export const useExchangeRate = () => {
  const [currentRate, setCurrentRate] = useState(INITIAL_EXCHANGE_RATE);
  const [fixedRate, setFixedRate] = useState(null);
  const [initialFixedRate, setInitialFixedRate] = useState(null);

  const handleSetFixedRate = (rate) => {
    setFixedRate(rate);
    setInitialFixedRate(currentRate);
  };

  useEffect(() => {
    const updateRate = () => {
      const variation = generateRandomVariation(RATE_VARIATION_RANGE);
      const newRate = Number((currentRate + variation).toFixed(4));
      setCurrentRate(newRate);
      
      if (fixedRate !== null) {
        const variationPercent = Math.abs((newRate - fixedRate) / newRate * 100);
        if (variationPercent > FIXED_RATE_VARIATION_THRESHOLD) {
          setFixedRate(null);
          setInitialFixedRate(null);
        }
      }
    };

    const interval = setInterval(updateRate, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [currentRate, fixedRate, initialFixedRate]);

  return {
    currentRate,
    fixedRate,
    setFixedRate: handleSetFixedRate,
    effectiveRate: fixedRate ?? currentRate
  };
};