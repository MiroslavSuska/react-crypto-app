import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import React from 'react';
import moment from 'moment';

type Props = {
  simplifiedView?: boolean;
};

const { Title, Text } = Typography;
const { Option } = Select;
const basicImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export function News(props: Props) {
  const { data: cryptoNewsData, isFetching } = useGetCryptoNewsQuery({
    newsCategory: 'Cryptocurrency',
    count: props.simplifiedView ? 8 : 20,
  });

  if (isFetching) return <div>Fetching data ...</div>;

  return (
    <div>
      <Row gutter={[24, 24]}>
        {cryptoNewsData.value.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title level={4} className='news-title'>
                    {news.name}
                  </Title>
                  <img src={news?.image?.thumbnail?.contentUrl || basicImage} alt='News image' />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
