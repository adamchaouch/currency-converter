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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Direction de conversion:</Text>
        <Switch
          checkedChildren="EUR → USD"
          unCheckedChildren="USD → EUR"
          checked={isEUR}
          onChange={onDirectionChange}
        />
      </div>
 
      <InputNumber
        style={{ width: '100%' }}
        value={amount}
        onChange={onAmountChange}
        prefix={isEUR ? "€" : "$"}
        placeholder="Montant à convertir"
        step="0.01"
        min={0}
      />
 
      <InputNumber
        style={{ width: '100%' }}
        value={convertedAmount}
        readOnly
        prefix={isEUR ? "$" : "€"}
      />
 
      <Space direction="vertical" style={{ width: '100%' }}>
        <InputNumber
          style={{ width: '100%' }}
          value={fixedRate}
          onChange={onFixedRateChange}
          placeholder="Définir un taux fixe (optionnel)"
          step="0.0001"
          precision={4}
          min={0.0001}
          formatter={value => `${value}`.replace(/[^0-9.]/g, '')}
          parser={value => value.replace(/[^0-9.]/g, '')}
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