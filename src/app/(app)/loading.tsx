'use client';

import React from 'react';

import styles from './app.module.scss';

import { Skeleton } from '@mantine/core';

const MainLoading = () => {
  return (
    <div className={styles.container}>
      <section className={styles.wishlistWrapper}>
        <div style={{ marginBottom: 12 }}>
          <Skeleton
            width={'20%'}
            height={36}
            radius={8}
            style={{ marginBottom: 12 }}
            color='blue'
          />
          <Skeleton width={'100%'} height={390} radius={8} />
        </div>
        <div>
          <Skeleton width={'20%'} height={36} radius={8} style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Skeleton width={'40%'} height={290} radius={8} />
            <Skeleton width={'60%'} height={290} radius={8} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainLoading;
