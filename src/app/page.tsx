'use client';

import { ConfigProvider } from 'antd';
import { Navbar } from './components/base/navbar/navbar';
import theme from './styles/themeConfig';

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <main className='min-h-screen flex-row items-center justify-between'>
        <Navbar />
      </main>
    </ConfigProvider>
  );
}
