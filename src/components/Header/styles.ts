import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
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