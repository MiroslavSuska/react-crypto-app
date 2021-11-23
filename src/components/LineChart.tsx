import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import React from 'react';

type Props = {
  coinHistory: any;
  currentPrice: number;
  coinName: string;
};

const { Title } = Typography;

export const LineChart = (props: Props) => {
  const { coinHistory, currentPrice, coinName } = props;
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    //@ts-ignore
    coinPrice.push(coinHistory.data.history[i].price);
    //@ts-ignore
    coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

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

      {/* @ts-ignore */}
      <Line data={data} options={options} />
    </div>
  );
};
