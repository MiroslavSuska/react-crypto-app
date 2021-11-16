import './App.css';
import { CryptoDetail, Cryptocurrencies, Exchanges, Homepage, Navbar, News } from './components';
import { Layout, Space, Typography } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Switch>
              <Route exact path='/'>
                <Homepage />
              </Route>
              <Route exact path='/exchanges'>
                <Exchanges />
              </Route>
              <Route exact path='/cryptocurrencies'>
                <Cryptocurrencies />
              </Route>
              <Route exact path='/crypto/:cryptoId'>
                <CryptoDetail />
              </Route>
              <Route exact path='/news'>
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className='footer'>
          <Typography.Title level={5}>
            Cryptocurrency application <br />
            @2021
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/news'>News</Link>
            <Link to='/exchanges'>Exchanges</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
