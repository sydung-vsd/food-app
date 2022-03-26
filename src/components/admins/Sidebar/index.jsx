import { Menu } from 'antd';

import {
  CoffeeOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  FolderViewOutlined,
  MoneyCollectOutlined,
  OrderedListOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';

import PropTypes from 'prop-types';

import history from '../../../utils/history';

import * as StyleSidebar from './style';

function Sidebar({ collapsed }) {
  return (
    <StyleSidebar.Wrap
      width={300}
      collapsedWidth={0}
      theme='light'
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <StyleSidebar.Logo>
        <StyleSidebar.LogoImg
          src='https://forcky.com/assets/images/store-logo4.png'
          alt=''
        />
        {!collapsed && <StyleSidebar.LogoText>FoodBooking</StyleSidebar.LogoText>}
      </StyleSidebar.Logo>
      <StyleSidebar.Menu theme='light' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item
          key='1'
          icon={<DashboardOutlined />}
          onClick={() => history.push('/manager')}
        >
          Bảng điều khiển
        </Menu.Item>
        <Menu.Item
          key='2'
          icon={<FolderViewOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý danh mục
        </Menu.Item>
        <Menu.Item
          key='3'
          icon={<CustomerServiceOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý khách hàng
        </Menu.Item>
        <Menu.Item
          key='4'
          icon={<ShopOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý cửa hàng
        </Menu.Item>
        <Menu.Item
          key='5'
          icon={<CoffeeOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý đồ ăn
        </Menu.Item>
        <Menu.Item
          key='6'
          icon={<OrderedListOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý đơn hàng
        </Menu.Item>
        <Menu.Item
          key='7'
          icon={<MoneyCollectOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý khuyến mãi
        </Menu.Item>
        <Menu.Item
          key='8'
          icon={<UserOutlined />}
          onClick={() => history.push('/manager/categories')}
        >
          Quản lý người dùng
        </Menu.Item>
      </StyleSidebar.Menu>
    </StyleSidebar.Wrap>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
