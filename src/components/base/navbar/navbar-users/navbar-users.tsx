import React, { useEffect, useState } from 'react';

import { NavbarFriendsSearch } from './navbar-users-search/friends-search/friends-search';
import { NavbarUserSearch } from './navbar-users-search/user-search';
import styles from './navbar-users.module.scss';

import { Loader, SegmentedControl, TextInput } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import type SwiperCore from 'swiper';

import 'swiper/css';

const options = [
  { value: 'friends', label: 'Friends' },
  { value: 'others', label: 'Users' },
];

export const NavbarUsers = () => {
  const [selected, setSelected] = useState('friends');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = useState<SwiperCore>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    if (!swiper) return;

    swiper.slideTo(selected === 'friends' ? 0 : 1);
  }, [selected]);

  const components = [
    <NavbarFriendsSearch query={search} setIsLoading={setIsLoading} key={0} />,
    <NavbarUserSearch query={search} setIsLoading={setIsLoading} key={1} isLoading={isLoading} />,
  ];

  return (
    <div className={styles.wrapper}>
      <SegmentedControl color='accent' data={options} value={selected} onChange={handleSelect} />
      <TextInput
        onChange={handleChange}
        value={search}
        placeholder='Search for users...'
        rightSection={isLoading && <Loader size={16} />}
      />
      <div className={styles.list}>
        <Swiper onSwiper={setSwiper} slidesPerView={1}>
          {components.map((component, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              {component}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
