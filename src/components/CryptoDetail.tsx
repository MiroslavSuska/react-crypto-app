import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Col, Row, Select, Typography } from 'antd';
import { LineChart } from './LineChart';
import { Loader } from './Loader';
import { SelectValue } from 'antd/lib/select';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import React, { useState } from 'react';
import millify from 'millify';

type paramsType = {
  crypto: string;
  cryptoId: string;
};

const { Title, Text } = Typography;
const { Option } = Select;

export function CryptoDetail() {
  const { cryptoId } = useParams<paramsType>();
  const [timePeriod, setTimePeriod] = useState<string | SelectValue>('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(cryptoId);
  const { data: coinHistoryData } = useGetCryptoHistoryQuery({ cryptoId, timePeriod });
  const cryptoDetails = data?.data?.coin;
  const time = ['24h', '7d', '30d', '1y', '5y'];

  // const stats = [
  //   {
  //     title: 'Price to USD',
  //     value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
  //     icon: <DollarCircleOutlined />,
  //   },
  //   { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
  //   {
  //     title: '24h Volume',
  //     value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
  //     icon: <ThunderboltOutlined />,
  //   },
  //   {
  //     title: 'Market Cap',
  //     value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
  //     icon: <DollarCircleOutlined />,
  //   },
  //   {
  //     title: 'All-time-high(daily avg.)',
  //     value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`,
  //     icon: <TrophyOutlined />,
  //   },
  // ];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails?.volume}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails?.marketCap}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${cryptoDetails?.allTimeHigh.price}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Approved Supply',
      value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${cryptoDetails?.totalSupply}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${cryptoDetails?.circulatingSupply}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  //console.log(cryptoDetails?.circulatingSupply);

  const handleSelectChange = (value: SelectValue) => {
    setTimePeriod(value);
  };

  if (isFetching) return <Loader />;

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics, market cap and
          supply.
        </p>
      </Col>

      <Select
        className='select-timeperiod'
        placeholder='Select time period'
        defaultValue='7d'
        onChange={handleSelectChange}
      >
        {time.map((timeOption, index) => (
          <Option key={index} value={timeOption}>
            {timeOption}
          </Option>
        ))}
      </Select>

      <LineChart
        coinHistory={coinHistoryData}
        currentPrice={cryptoDetails.price}
        coinName={cryptoDetails.name}
      />

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className='coin-stats' key={index}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className='coin-stats' key={index}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link, index) => (
            <Row className='coin-link' key={index}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}
