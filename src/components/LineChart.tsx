import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import React from 'react';
import millify from 'millify';

type coinHistoryType = {
  change: number;
  history: {
    price: string;
    timestamp: number;
  }[];
};

type Props = {
  coinHistory: coinHistoryType;
  currentPrice: string;
  coinName: string;
};

const { Title } = Typography;

export const LineChart = (props: Props) => {
  const { coinHistory, currentPrice, coinName } = props;
  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];

  for (let i = 0; i < coinHistory?.history.length; i++) {
    coinPrice.push(coinHistory.history[i].price);
    coinTimestamp.push(new Date(coinHistory.history[i].timestamp).toLocaleDateString());
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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} price chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            Change: {coinHistory?.change}%
          </Title>
          <Title level={5} className='current-change'>
            Current {coinName} Price: $ {millify(parseInt(currentPrice))}
          </Title>
        </Col>
      </Row>

      {/* @ts-ignore */}
      <Line data={data} options={options} />
    </div>
  );
};
