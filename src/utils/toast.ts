import styles from '@/styles/toast.module.scss';

import { ToastOptions, toast } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: styles.wrapper,
  progressClassName: styles.progress,
};

export const notify = (
  type: 'success' | 'error' | 'info' | 'warning' = 'success',
  message: string,
) => {
  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
  }
};
