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
import { log } from 'console';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import React, { useState } from 'react';
import millify from 'millify';

type paramsType = {
  crypto: string;
  cryptoId: string;
};

type coinHistoryType = {
  change: number;
  history: {
    price: string;
    timestamp: number;
  }[];
};

type linkType = {
  name: string;
  type: string;
  url: string;
};

type cryptoDetailsType = {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  links: {
    name: string;
    type: string;
    url: string;
  }[];
  rank: number;
  volume: number;
  marketCap: number;
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
  approvedSupply: boolean;
  totalSupply: number;
  circulatingSupply: number;
};

const { Title, Text } = Typography;
const { Option } = Select;

export function CryptoDetail() {
  const { cryptoId } = useParams<paramsType>();
  const [timePeriod, setTimePeriod] = useState<string | SelectValue>('7d');
  const { data: cryptoDetailsData, isFetching } = useGetCryptoDetailsQuery(cryptoId);
  const { data: coinHistoryData } = useGetCryptoHistoryQuery({
    cryptoId,
    timePeriod,
  });

  const cryptoDetails = cryptoDetailsData?.data?.coin;

  const coinHistory: coinHistoryType = coinHistoryData?.data;

  const time = ['24h', '7d', '30d', '1y', '5y'];

  // const {
  //   name,
  //   slug,
  //   price,
  //   description,
  //   links,
  //   rank,
  //   volume,
  //   marketCap,
  //   allTimeHigh,
  //   numberOfMarkets,
  //   numberOfExchanges,
  //   approvedSupply,
  //   totalSupply,
  //   circulatingSupply,
  // }: cryptoDetailsType = cryptoDetailsData?.data?.coin;

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

  const handleSelectChange = (value: SelectValue) => {
    setTimePeriod(value);
  };

  if (isFetching) return <Loader />;

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name} ({cryptoDetails?.slug}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US dollars. View value statistics, market cap and
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
        coinHistory={coinHistory}
        currentPrice={cryptoDetails?.price}
        coinName={cryptoDetails?.name}
      />

      <Col className='stats-container'>
        <Col className='coin-value-statistics' xs={24} sm={24} md={12} lg={12}>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails?.name} value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
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
        <Col className='other-stats-info' xs={24} sm={24} md={12} lg={12}>
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
        <Col className='coin-desc' xs={24} sm={24} md={12} lg={12}>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails?.name}
          </Title>
          <div>{HTMLReactParser(cryptoDetails?.description)}</div>
        </Col>
        <Col className='coin-links' xs={24} sm={24} md={12} lg={12}>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links.map((link: linkType, index: number) => (
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
