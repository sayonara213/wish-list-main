'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './additional.module.scss';

import { useAuth } from '../../provider/auth-provider';

import { additionalAuthSchema } from '@/constants/validation';
import { Database } from '@/lib/schema';
import container from '@/styles/container.module.scss';
import { IAdditionalAuthForm } from '@/types/form.types';
import { classes } from '@/utils/styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, TextInput, Button, Text } from '@mantine/core';
import { DateValue, DateInput } from '@mantine/dates';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

export const AuthAdditional = () => {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAdditionalAuthForm>({
    resolver: yupResolver<IAdditionalAuthForm>(additionalAuthSchema),
    mode: 'onBlur',
  });

  const formatDate = (date: Date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Returns a date string in 'YYYY-MM-DD' format
  };

  const onSubmit = async (data: IAdditionalAuthForm) => {
    setIsLoading(true);

    const fieldData = {
      id: auth.id,
      full_name: data.fullName as string,
      date_of_birth: formatDate(data.birthDate!),
    };

    try {
      await supabase.from('profiles').insert(fieldData).eq('id', auth.id);
      setIsLoading(false);
      router.refresh();
    } catch {}
  };

  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      setValue('birthDate', date);
    }
  };

  return (
    <div className={classes(container.container, styles.wrapper)}>
      <Text size='xl'>One more step...</Text>
      <Text size='md'>Let others know more about you!</Text>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input.Wrapper
          id='full-name'
          label='Full name'
          description='Set your full name to let others know who you are'
        >
          <TextInput
            placeholder='Name'
            {...(register && register('fullName'))}
            error={errors['fullName']?.message}
            style={{ marginTop: 6 }}
          />
        </Input.Wrapper>
        <Input.Wrapper
          id='birth-date'
          label='Date of birth'
          description='Let your friends know when to buy you a gift'
        >
          <DateInput
            onChange={handleDateChange}
            placeholder={'Date of birth'}
            style={{ marginTop: 6 }}
            maxDate={dayjs().subtract(6, 'year').toDate()}
          />
        </Input.Wrapper>
        <Button loading={isLoading} type='submit'>
          Finish
        </Button>
      </form>
    </div>
  );
};
