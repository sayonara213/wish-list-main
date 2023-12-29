'use client';

import React, { useCallback, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './auth.module.scss';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';

import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { Database } from '@/lib/schema';
import { IAuthForm } from '@/types/form.types';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { EffectFlip } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-flip';

const Auth: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
  }, []);

  const handleSignIn = async (values: IAuthForm) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (values: IAuthForm) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      await supabase.auth.signUp({
        email,
        password,
      });
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const components = [
    <SignIn next={handleNext} handleSignIn={handleSignIn} isLoading={isLoading} key={0} />,
    <SignUp next={handleNext} handleSignUp={handleSignUp} isLoading={isLoading} key={1} />,
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Icon logo />
        <Paragraph size='title' weight='bold'>
          Wishy
        </Paragraph>
      </div>
      <div className={styles.container}>
        <Swiper
          effect={'flip'}
          loop
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[EffectFlip]}
          speed={800}
        >
          {components.map((component, index) => (
            <SwiperSlide key={index}>{component}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Auth;
