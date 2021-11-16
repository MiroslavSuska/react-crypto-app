import { Card, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { useGetCryptosQuery } from '../services/cryptoAPI';
import millify from 'millify';

type Props = {
  simplifiedView?: boolean;
};

export function Cryptocurrencies(props: Props) {
  const displayCount = props.simplifiedView ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(displayCount);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins?.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isFetching) return <div>Fetching data ...</div>;

  return (
    <div>
      {!props.simplifiedView && (
        <div className='search-crypto'>
          <Input type='text' placeholder='Search for cryptocurrency ...' onChange={handleInput} />
        </div>
      )}

      <Row gutter={[30, 30]} className='crypto-card-container'>
        {cryptos?.map(cryptoCurrency => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={cryptoCurrency.id}>
            <Link to={`/crypto/${cryptoCurrency.id}`}>
              <Card
                title={`${cryptoCurrency.rank}. ${cryptoCurrency.name}`}
                extra={<img src={cryptoCurrency.iconUrl} className='crypto-image' />}
                hoverable
              >
                <p>Price: {millify(cryptoCurrency.price)}</p>
                <p>Market Cap: {millify(cryptoCurrency.marketCap)}</p>
                <p>Daily Change: {millify(cryptoCurrency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
