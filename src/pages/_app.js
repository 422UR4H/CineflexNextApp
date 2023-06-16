import '@/styles/globals.css';
import MainLayout from '@/components/MainLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';


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
