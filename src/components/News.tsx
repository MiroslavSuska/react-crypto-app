import { Avatar, Card, Col, Input, Row, Select, Typography } from 'antd';
import { Loader } from './Loader';
import { SelectValue } from 'antd/lib/select';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import React, { useState } from 'react';
import moment from 'moment';

type Props = {
  simplifiedView?: boolean;
};

const { Title, Text } = Typography;
const { Option } = Select;
const basicImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export function News(props: Props) {
  const [newsCategory, setNewsCategory] = useState<string | SelectValue>('Cryptocurrency');
  const { data: cryptoNewsData, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: props.simplifiedView ? 8 : 20,
  });
  const { data: cryptoList } = useGetCryptosQuery(100);

  const handleSelectChange = (value: SelectValue) => {
    setNewsCategory(value);
  };

  if (isFetching) return <Loader />;

  return (
    <div>
      <Row gutter={[24, 24]}>
        {!props.simplifiedView && (
          <Col span={24}>
            <Select
              className='select-news'
              showSearch
              placeholder='Select a news'
              onChange={handleSelectChange}
              optionFilterProp='children'
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value='Cryptocurrency'>Cryptocurrency</Option>
              {cryptoList?.data?.coins.map(coin => (
                <Option value={coin.name} key={coin.id}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNewsData.value.map((news, index: number) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title level={4} className='news-title'>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || basicImage}
                    alt='News image'
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || basicImage} />
                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('second').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
