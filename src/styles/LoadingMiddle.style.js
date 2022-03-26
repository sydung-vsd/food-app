import styled from 'styled-components';
import { Spin } from 'antd';

export const LoadingMiddleStyle = styled(Spin)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
