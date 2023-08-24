import React from 'react';

import styles from './loading.module.scss';

import { Paragraph } from '@/components/ui/text/text';

const SplashScreen = () => {
  return (
    <div className={styles.wrapper}>
      <Paragraph size='lg' weight='medium'>
        Wishy!
      </Paragraph>
    </div>
  );
};

export default SplashScreen;
