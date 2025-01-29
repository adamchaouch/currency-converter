import { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_EXCHANGE_RATE,
  UPDATE_INTERVAL,
  RATE_VARIATION_RANGE,
  FIXED_RATE_VARIATION_THRESHOLD
} from '../constants/config';
import { generateRandomVariation, calculateVariationPercentage } from '../utils/currency';

export const useExchangeRate = () => {
  // État pour le taux de change actuel et le taux fixe optionnel
  const [currentRate, setCurrentRate] = useState(INITIAL_EXCHANGE_RATE);
  const [fixedRate, setFixedRate] = useState(null);

  // Fonction de mise à jour du taux avec vérification du taux fixe
  const updateRate = useCallback(() => {
    const variation = generateRandomVariation(RATE_VARIATION_RANGE);
    
    setCurrentRate(prevRate => {
      const newRate = Number((prevRate + variation).toFixed(4));
      
      // Si un taux fixe est défini, vérifie s'il doit être désactivé
      if (fixedRate) {
        const variation = calculateVariationPercentage(newRate, fixedRate);
        if (variation > FIXED_RATE_VARIATION_THRESHOLD) {
          setFixedRate(null);
        }
      }
      
      return newRate;
    });
  }, [fixedRate]);

  // Effet pour la mise à jour périodique du taux
  useEffect(() => {
    const interval = setInterval(updateRate, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [updateRate]);

  // Le taux effectif est soit le taux fixe s'il existe, soit le taux actuel
  const effectiveRate = fixedRate || currentRate;

  return {
    currentRate,
    fixedRate,
    setFixedRate,
    effectiveRate
  };
};