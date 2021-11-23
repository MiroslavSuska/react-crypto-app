import { Col, Row, Statistic, Typography } from 'antd';
import { Cryptocurrencies, News } from './';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import React from 'react';
import millify from 'millify';

const { Title } = Typography;
const numOfCryptos = 10;

export function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(numOfCryptos);
  const globalStatsData = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <div>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={globalStatsData.total} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Exchanges' value={millify(globalStatsData.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Market Cap' value={millify(globalStatsData.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title='Total 24h Volume' value={millify(globalStatsData.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Markets' value={millify(globalStatsData.totalMarkets)} />
        </Col>
      </Row>

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/cryptocurrencies'>Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplifiedView />

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Crypto News
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/news'>Show more</Link>
        </Title>
      </div>
      <News simplifiedView />
    </div>
  );
}
