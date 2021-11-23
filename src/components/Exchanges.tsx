import { Avatar, Col, Collapse, Row, Typography } from 'antd';
import { Loader } from './Loader';
import { useGetCryptoExchangesQuery } from '../services/cryptoAPI';
import HTMLReactParser from 'html-react-parser';
import React from 'react';
import millify from 'millify';

const { Panel } = Collapse;
const { Text } = Typography;

export function Exchanges() {
  // @ts-ignore
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const cryptoExchangesData = data?.data?.exchanges;

  //console.log(cryptoExchangesData);

  if (isFetching) return <Loader />;

  return (
    <div>
      <Row className='exchange-header-row'>
        <Col span={6}>
          <strong>Exchanges</strong>
        </Col>
        <Col span={6}>
          <strong>24h Trade volume</strong>
        </Col>
        <Col span={6}>
          <strong>Markets</strong>
        </Col>
        <Col span={6}>
          <strong>Change</strong>
        </Col>
      </Row>
      <Row>
        {cryptoExchangesData.map(exchangeData => (
          <Col key={exchangeData.id} span={24}>
            <Collapse>
              <Panel
                key={exchangeData.id}
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text>
                        <strong>{exchangeData.rank}</strong>
                      </Text>
                      <Avatar src={exchangeData.iconUrl} className='exchange-image'></Avatar>
                      <Text>
                        <strong>{exchangeData.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>$ {millify(exchangeData.volume)}</Col>
                    <Col span={6}>{exchangeData.numberOfMarkets}</Col>
                    <Col span={6}>{millify(exchangeData.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchangeData.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
}
