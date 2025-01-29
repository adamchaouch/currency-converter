import React from 'react';
import { Alert, Space } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const ExchangeRateDisplay = ({ currentRate, fixedRate }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <SyncOutlined spin style={{ color: '#1890ff' }} />
        <span>Taux de change actuel: 1 EUR = {currentRate.toFixed(4)} USD</span>
      </div>
      
      {fixedRate && (
        <Alert
          message={`Taux fixe actif: 1 EUR = ${fixedRate.toFixed(4)} USD`}
          type="info"
          showIcon
        />
      )}
    </Space>
  );
};

export default ExchangeRateDisplay;