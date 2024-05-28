// src/components/LoadingButton.tsx
import React from 'react';
import { Button } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { ButtonType } from 'antd/es/button';

interface LoadingButtonProps extends BaseButtonProps {
  loading: boolean;
  type: ButtonType;
  onClick: () => void;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, onClick, type, children, ...props }) => {
  return (
    <Button {...props} type={type} loading={loading} onClick={!loading ? onClick : undefined}>
      {children}
    </Button>
  );
};

export default LoadingButton;
