// src/components/Loading.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '@/store';

const Loading: React.FC = () => {
  const loading = useSelector((state: RootState) => state.loading);

  if (!loading) return null;

  return (
    <div style={loadingStyle}>
      <Spin size="large" />
    </div>
  );
};

const loadingStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
};

export default Loading;
