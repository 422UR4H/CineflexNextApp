import '@/styles/reset.css';
import '@/styles/globals.css';
import axios from 'axios';
import MainLayout from '@/components/MainLayout';
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps }) {
  const [booking, setBooking] = useState({});

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'JlbBWy24nl0PcbNqcXlASkN2';
  }, []);

  return (
    <MainLayout>
      <Component {...pageProps} booking={booking} setBooking={setBooking} />
    </MainLayout>
  );
}
