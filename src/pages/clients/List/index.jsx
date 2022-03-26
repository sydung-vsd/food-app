import { useEffect, useState } from 'react';
import { Col, Menu, Row } from 'antd';
import { MdNavigateNext } from 'react-icons/all';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import history from '../../../utils/history';
import { IMG_SRC, PATH, URL } from '../../../contants';

import StoreList from './components/StoreList';
import FoodList from './components/FoodList';

import * as ClientStyle from '../styles';
import { Helmet } from 'react-helmet';

const ClientList = ({ setShowLogin }) => {
  const [menuActive, setMenuActive] = useState('foods');

  useEffect(() => {
    setMenuActive(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <ClientStyle.Section style={{ backgroundColor: '#f3f3f3' }}>
      <ClientStyle.Container>
        <Helmet>
          <meta
            name='description'
            content='Freshfood đồ ăn nhanh cho nhà nhà!'
          />
          <meta property='fb:app_id' content={URL(history.location.pathname)} />
          <meta property='og:type' content='website' />
          <meta property='og:image' content={IMG_SRC('/logo192.png')} />
          <meta property='og:url' content={URL(history.location.pathname)} />
          <meta property='og:description' content='Freshfood đồ ăn nhanh cho nhà nhà!' />
        </Helmet>
        <Row gutter={20}>
          <Col lg={4} md={4} sm={24} xs={24}>
            <ClientStyle.MenuList offsetTop={88.375}>
              <Menu
                id='menu_list_page'
                theme='light'
                selectedKeys={[menuActive]}
                mode='inline'
              >
                <Menu.Item
                  key={PATH.STORE}
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.STORE);
                  }}
                >
                  Ở đâu
                </Menu.Item>
                <Menu.Item
                  key={PATH.FOOD}
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.FOOD);
                  }}
                >
                  Ăn gì
                </Menu.Item>
                <Menu.Item
                  key={PATH.PROMOTION}
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.PROMOTION);
                  }}
                >
                  Khuyến mãi
                </Menu.Item>
                <Menu.Item
                  key={PATH.CROWDED}
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.CROWDED);
                  }}
                >
                  Đông khách
                </Menu.Item>
                <Menu.Item
                  key={PATH.FAVORITE}
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.FAVORITE);
                  }}
                >
                  Yêu thích
                </Menu.Item>
              </Menu>
            </ClientStyle.MenuList>
          </Col>
          <Col ld={20} md={20} sm={24} xs={24} className='list-content'>
            <Switch>
              <Route exact path={PATH.STORE} component={StoreList} />
              <Route
                exact
                path={PATH.FOOD}
                setShowLogin={setShowLogin}
                render={() => <FoodList setShowLogin={setShowLogin} />}
              />
              <Route
                exact
                path={PATH.PROMOTION}
                render={() => <FoodList setShowLogin={setShowLogin} />}
              />
              <Route
                exact
                path={PATH.CROWDED}
                component={StoreList}
              />
              <Route exact path={PATH.FAVORITE} render={() => <FoodList setShowLogin={setShowLogin} />} />
            </Switch>
          </Col>
        </Row>
      </ClientStyle.Container>
    </ClientStyle.Section>
  );
};
export default ClientList;

ClientList.propTypes = {
  setShowLogin: PropTypes.func,
};
