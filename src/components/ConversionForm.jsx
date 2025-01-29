import React from 'react';
import { InputNumber, Switch, Space, Typography, Button } from 'antd';

const { Text } = Typography;

const ConversionForm = ({
  amount,
  isEUR,
  convertedAmount,
  fixedRate,
  onAmountChange,
  onDirectionChange,
  onFixedRateChange,
  onResetFixedRate
}) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Direction de conversion */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Direction de conversion:</Text>
        <Switch
          checkedChildren="EUR → USD"
          unCheckedChildren="USD → EUR"
          checked={isEUR}
          onChange={onDirectionChange}
        />
      </div>

      {/* Montant à convertir */}
      <InputNumber
        style={{ width: '100%' }}
        value={amount}
        onChange={onAmountChange}
        prefix={isEUR ? "€" : "$"}
        placeholder="Montant à convertir"
        step="0.01"
      />

      {/* Résultat de la conversion */}
      <InputNumber
        style={{ width: '100%' }}
        value={convertedAmount}
        readOnly
        prefix={isEUR ? "$" : "€"}
      />

      {/* Taux de change fixe */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <InputNumber
          style={{ width: '100%' }}
          value={fixedRate}
          onChange={onFixedRateChange}
          placeholder="Définir un taux fixe (optionnel)"
          step="0.0001"
          precision={4}
        />
        {fixedRate && (
          <Button 
            type="link" 
            onClick={onResetFixedRate}
            style={{ padding: 0 }}
          >
            Réinitialiser le taux fixe
          </Button>
        )}
      </Space>
    </Space>
  );
};

export default ConversionForm;