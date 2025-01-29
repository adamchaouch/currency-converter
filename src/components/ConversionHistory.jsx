import React from 'react';
import { Table, Typography } from 'antd';
import { formatCurrency } from '../utils/currency';

const { Title } = Typography;

const ConversionHistory = ({ history }) => {
  const columns = [
    {
      title: 'Taux Réel',
      dataIndex: 'realRate',
      key: 'realRate',
      render: (value) => value.toFixed(4),
    },
    {
      title: 'Taux Utilisé',
      dataIndex: 'usedRate',
      key: 'usedRate',
      render: (value) => value.toFixed(4),
    },
    {
      title: 'Montant Initial',
      key: 'input',
      render: (_, record) => formatCurrency(record.inputAmount, record.inputCurrency),
    },
    {
      title: 'Montant Converti',
      key: 'output',
      render: (_, record) => formatCurrency(record.outputAmount, record.outputCurrency),
    },
  ];

  return (
    <div style={{ marginTop: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Historique des conversions</Title>
      <Table
        dataSource={history}
        columns={columns}
        pagination={false}
        rowKey="timestamp"
        size="small"
      />
    </div>
  );
};

export default ConversionHistory;