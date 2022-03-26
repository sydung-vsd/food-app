import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import PropTypes from 'prop-types';

import * as AppStyle from '../../../styles';
import * as Style from './style';

function Header({ collapsed, toggle }) {
  return (
    <Style.Header>
      <Style.Flex>
        <Space>
          <AppStyle.Icon>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => toggle(!collapsed)} />
            ) : (
              <MenuFoldOutlined onClick={() => toggle(!collapsed)} />
            )}
          </AppStyle.Icon>
          <Style.SearchForm placeholder='Search Keywords...' />
        </Space>
        <Space>
          <AppStyle.Icon>
            <SettingOutlined />
          </AppStyle.Icon>
          <AppStyle.Icon>
            <MessageOutlined />
          </AppStyle.Icon>
          <AppStyle.Icon>H</AppStyle.Icon>
        </Space>
      </Style.Flex>
    </Style.Header>
  );
}

export default Header;

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
