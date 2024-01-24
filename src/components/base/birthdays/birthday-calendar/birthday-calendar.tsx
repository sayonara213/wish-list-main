'use client';

import React from 'react';

import styles from '../birthdays.module.scss';

import { TProfile } from '@/types/database.types';

import { Tooltip, Avatar } from '@mantine/core';
import { Calendar } from '@mantine/dates';

interface IBirthdayCalendarProps {
  friends: TProfile[];
}

export const BirthdayCalendar: React.FC<IBirthdayCalendarProps> = ({ friends }) => {
  const handleRenderDay = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();

    const friend = friends.find((friend) => {
      const friendDay = new Date(friend.date_of_birth).getDate();
      const friendMonth = new Date(friend.date_of_birth).getMonth();

      return friendDay === day && friendMonth === month;
    });

    return friend ? (
      <Tooltip label={`${friend.full_name}'s birthday`}>
        <div className={styles.friend}>
          <Avatar src={friend.avatar_url} size={26} />
        </div>
      </Tooltip>
    ) : (
      day
    );
  };

  const handleRenderMonth = (date: Date) => {
    const month = date.getMonth();

    const friend = friends.find((friend) => {
      const friendMonth = new Date(friend.date_of_birth).getMonth();

      return friendMonth === month;
    });

    return friend
      ? {
          style: {
            color: 'var(--color-primary)',
            fontWeight: 700,
          },
        }
      : {};
  };

  const getClosestBirthday = () => {
    const closestBd = friends.reduce((prev, curr) => {
      const prevDate = new Date(prev.date_of_birth);
      const currDate = new Date(curr.date_of_birth);

      const prevDistance = prevDate.getTime() - new Date().getTime();
      const currDistance = currDate.getTime() - new Date().getTime();

      return prevDistance < currDistance ? prev : curr;
    });

    const bdayMonth = new Date(closestBd.date_of_birth).getMonth();
    const bdayDate = new Date();
    bdayDate.setMonth(bdayMonth);

    return bdayDate;
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        size='xs'
        defaultDate={getClosestBirthday()}
        renderDay={handleRenderDay}
        getMonthControlProps={handleRenderMonth}
        className={styles.calendar}
        defaultLevel='month'
        maxLevel='year'
      />
    </div>
  );
};
