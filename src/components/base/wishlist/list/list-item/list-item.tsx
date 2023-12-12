import React from 'react';

import Link from 'next/link';

import styles from './list-item.module.scss';

import { ShopLinkImage } from '@/components/base/shop-links/shop-links-item/shop-link-image/shop-link-image';
import { Icon } from '@/components/ui/icon/icon';
import { Paragraph } from '@/components/ui/text/text';
import { useRaisedShadow } from '@/hooks/use-raised-shdows';
import { TWishlistItem } from '@/types/database.types';

import { Reorder, useDragControls, useMotionValue } from 'framer-motion';

interface IWishlistListItemProps {
  item: TWishlistItem;
}

export const WishlistListItem: React.FC<IWishlistListItemProps> = ({ item }) => {
  const y = useMotionValue(0);
  const controls = useDragControls();
  const boxShadow = useRaisedShadow(y);

  const iRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) => e.preventDefault();

    const iTag = iRef.current;

    if (iTag) {
      //@ts-ignore
      iTag.addEventListener('touchstart', touchHandler, { passive: false });

      return () => {
        //@ts-ignore
        iTag.removeEventListener('touchstart', touchHandler, {
          passive: false,
        });
      };
    }
    return;
  }, [iRef]);

  const handleDrag = (event: React.PointerEvent) => {
    controls.start(event);
  };

  return (
    <Reorder.Item
      ref={iRef}
      key={item.id}
      value={item}
      className={styles.wrapper}
      style={{ y, boxShadow }}
      dragListener={false}
      dragControls={controls}
    >
      <div className={styles.pair}>
        {item.link && (
          <Link href={item.link}>
            <ShopLinkImage src={item.link} />
          </Link>
        )}
        <div className={styles.main}>
          <Paragraph size='base' weight='medium'>
            {item.name}
          </Paragraph>
          <Paragraph size='sm' weight='normal' color='muted'>
            {item.description}
          </Paragraph>
        </div>
      </div>
      <div className={styles.pair}>
        <Paragraph size='md' weight='medium'>
          {item.price} USD
        </Paragraph>
        <button onPointerDown={handleDrag} className={styles.dragbtn}>
          <Icon name='drag_indicator' color='muted' size={24} style={{ touchAction: 'none' }} />
        </button>
      </div>
    </Reorder.Item>
  );
};
