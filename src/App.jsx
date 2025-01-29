import React, { useState } from 'react';
import { Layout, Card, Space } from 'antd';
import { useExchangeRate } from './hooks/useExchangeRate';
import ExchangeRateDisplay from './components/ExchangeRateDisplay';
import ConversionForm from './components/ConversionForm';
import ConversionHistory from './components/ConversionHistory';
import { MAX_HISTORY_ITEMS } from './constants/config';

const { Content } = Layout;

function App() {
  // États locaux
  const [amount, setAmount] = useState(1);
  const [isEUR, setIsEUR] = useState(true);
  const [history, setHistory] = useState([]);
  const [lastConversion, setLastConversion] = useState(null);

  // Utilisation du hook personnalisé pour le taux de change
  const { currentRate, fixedRate, setFixedRate, effectiveRate } = useExchangeRate();

  // Fonction de conversion
  const convert = (value, isEuroInput) => {
    if (value === null) return null;
    return isEuroInput ? value * effectiveRate : value / effectiveRate;
  };

  // Gestionnaire de changement de montant
  const handleAmountChange = (value) => {
    if (value === null) return;
    setAmount(value);
    
    const convertedAmount = convert(value, isEUR);
    const conversion = {
      timestamp: new Date().toISOString(),
      realRate: currentRate,
      usedRate: effectiveRate,
      inputAmount: value,
      inputCurrency: isEUR ? 'EUR' : 'USD',
      outputAmount: convertedAmount,
      outputCurrency: isEUR ? 'USD' : 'EUR',
    };
    
    setLastConversion(conversion);
    setHistory(prev => [conversion, ...prev].slice(0, MAX_HISTORY_ITEMS));
  };

  // Gestionnaire de changement de direction
  const handleDirectionChange = (checked) => {
    setIsEUR(checked);
    if (lastConversion) {
      setAmount(lastConversion.outputAmount);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Card 
          title="Convertisseur de Devises" 
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <ExchangeRateDisplay
              currentRate={currentRate}
              fixedRate={fixedRate}
            />

            <ConversionForm
              amount={amount}
              isEUR={isEUR}
              convertedAmount={convert(amount, isEUR)}
              fixedRate={fixedRate}
              onAmountChange={handleAmountChange}
              onDirectionChange={handleDirectionChange}
              onFixedRateChange={setFixedRate}
              onResetFixedRate={() => setFixedRate(null)}
            />

            <ConversionHistory history={history} />
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}

export default App;