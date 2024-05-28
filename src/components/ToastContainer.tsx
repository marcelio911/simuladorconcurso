// src/components/ToastContainer.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { RootState } from '../store';
import { hideToast } from '../store/slices/toastSlice';

const ToastContainer: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (toast.visible) {
      notification[toast.type]({
        message: toast.message,
        description: toast.description,
        onClose: () => dispatch(hideToast()),
      });
    }
  }, [toast, dispatch]);

  return null;
};

export default ToastContainer;
