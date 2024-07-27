import React, { useState } from 'react';
import { Button, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { RightSection, StyledHeader } from './styles';
import useQuestions from '../../hooks/useQuestions';
import MenuComponent from './MenuComponent';
interface HeaderProps {
  isLogged?: boolean;
}

const HeaderBar: React.FC<HeaderProps> = ({ isLogged = false }) => {
  const history = useNavigate();
  const { explainQuetions } = useQuestions();
  const [theme, setTheme] = useState('dark');

  const handleBack = () => {
    history(-1);
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
  };

  const handleMenuClick = ({ key }: any) => {
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = (path: string, section: string) => {
    console.info(`Navigating to ${path} - ${section}`);
    history('/' + path);
    handleMenuClick(section);
  };

  return (
    <StyledHeader>
      <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
      {isLogged && (
        <><MenuComponent theme={theme} handleMenuClick={handleMenuClick} navigate={navigate} />

          <RightSection>
            <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              onChange={handleThemeChange}
            />

            <button type="submit" onClick={() => { explainQuetions() }} id="help">?</button>
            {/* <Button icon={<LogoutOutlined />}>Sair</Button> */}

          </RightSection>
        </>
      )}
    </StyledHeader>
  );
};

export default HeaderBar;
