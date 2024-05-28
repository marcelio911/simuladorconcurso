import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const MenuWrapper = styled(Menu)`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;