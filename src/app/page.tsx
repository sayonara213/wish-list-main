'use client';

import { Button } from './components/ui/button/button';
import { Text } from './components/ui/text/text';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Button variant='solid'>Button</Button>
      <Text weight='bold' size='3xl'>
        123
      </Text>
    </main>
  );
}
