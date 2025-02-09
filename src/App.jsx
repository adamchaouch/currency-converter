// App.jsx
import { useCallback, useState } from 'react';
import { Layout, Card, Space } from 'antd';
import { useExchangeRate } from './hooks/useExchangeRate';
import ExchangeRateDisplay from './components/ExchangeRateDisplay';
import ConversionForm from './components/ConversionForm';
import ConversionHistory from './components/ConversionHistory';
import { MAX_HISTORY_ITEMS } from './constants/config';

const { Content } = Layout;

function App() {
 const [amount, setAmount] = useState(1);
 const [isEUR, setIsEUR] = useState(true);

 const [history, setHistory] = useState([]);  
 const [lastConversion, setLastConversion] = useState(null);

 const { currentRate, fixedRate, setFixedRate, effectiveRate } = useExchangeRate();

 const convert = useCallback((value, isEuroInput) => {
  if (value === null || value === undefined) return null;
  return Number((isEuroInput ? value * effectiveRate : value / effectiveRate).toFixed(4));
}, [effectiveRate]);


 const createConversion = useCallback((value, isEuroInput) => {
  const convertedAmount = convert(value, isEuroInput);
  return {
    timestamp: new Date().toISOString(),
    realRate: currentRate,
    usedRate: effectiveRate,
    inputAmount: value,
    inputCurrency: isEuroInput ? 'EUR' : 'USD',
    outputAmount: convertedAmount,
    outputCurrency: isEuroInput ? 'USD' : 'EUR',
  };
}, [currentRate, effectiveRate, convert]);

const updateHistory = useCallback((conversion) => {
  setLastConversion(conversion);
  setHistory(prev => [conversion, ...prev].slice(0, MAX_HISTORY_ITEMS));
}, []);

const handleAmountChange = useCallback((value) => {
  if (value === null) return;
  setAmount(value);
  const conversion = createConversion(value, isEUR);
  updateHistory(conversion);
}, [isEUR, createConversion, updateHistory]);

const handleDirectionChange = useCallback((checked) => {
  if (lastConversion) {
    const newAmount = lastConversion.outputAmount;
    const conversion = createConversion(newAmount, checked);
    setIsEUR(checked);
    setAmount(newAmount);
    updateHistory(conversion);
  } else {
    setIsEUR(checked);
  }
}, [lastConversion, createConversion, updateHistory]);

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