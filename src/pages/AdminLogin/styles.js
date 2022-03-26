import styled from 'styled-components';
import { Button } from 'antd';

export const LoginWrap = styled.div`
  display: block;
  margin: auto;
  padding-top: 7%;
  min-height: 100vh;
  background: #e4e7ea !important;
`;

export const FormWrap = styled.div`
  padding: 15px;
  margin: 0 auto;
  width: 33.333%;
  background: #fafafa;
`;

export const H3 = styled.h3`
  margin: 0 0 15px;
  text-transform: capitalize;
  font-size: 18px;
  line-height: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  color: #444;
`;
export const ButtonSubmit = styled(Button)`
  padding: 0 12px;
  min-height: 30px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  color: #444;
  box-sizing: border-box;
  vertical-align: middle;
  text-align: center;
  line-height: 28px;
  font-size: 1rem;
  background: #f5f5f5;
  text-shadow: 0 1px 0 #fff;

  &:hover {
    border-color: rgba(0, 0, 0, 0.16);
    outline: 0;
    text-decoration: none;
    color: #444;
  }
`;
