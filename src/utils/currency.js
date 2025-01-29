// Formate un montant selon la devise spécifiée
export const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(amount);
  };
  
  // Calcule le pourcentage de variation entre deux taux
  export const calculateVariationPercentage = (newRate, oldRate) => {
    return Math.abs((newRate - oldRate) / oldRate) * 100;
  };
  
  // Génère une variation aléatoire dans la plage spécifiée
  export const generateRandomVariation = (range) => {
    return (Math.random() * (range * 2)) - range;
  };