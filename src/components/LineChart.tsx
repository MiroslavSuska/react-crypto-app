import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import React from 'react';

type Props = {
  coinHistory?: any;
  currentPrice: number;
  coinName: string;
};

const { Title } = Typography;

export const LineChart = (props: Props) => {
  const { coinHistory, currentPrice, coinName } = props;

  return (
    <div>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} price chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className='current-change'>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
    </div>
  );
};
