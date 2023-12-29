import { useEffect } from 'react';

import { animate, MotionValue, useMotionValue } from 'framer-motion';

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.1)';

export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.on('change', (latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.15)');
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}
