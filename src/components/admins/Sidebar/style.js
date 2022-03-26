import styled from 'styled-components';
import { Layout, Menu as AtndMenu } from 'antd';

const { Sider } = Layout;
export const Wrap = styled(Sider)``;

export const Menu = styled(AtndMenu)`
  height: calc(100% - 65px);
  border-top: 1px solid #e9ecef;
`;
export const LogoImg = styled.img`
  margin-right: 4px;
  height: 32px;
  vertical-align: middle;
`;

export const LogoText = styled.span`
  font-size: 24px;
  vertical-align: middle;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 70px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 70px;
`;
