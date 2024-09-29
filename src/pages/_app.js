import CustomAlert from '@/components/CustomAlert';
import { GlobalContext } from '@/hooks/context';
import '@/styles/globals.css';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [alertType, setAlertType] = useState('');

  return (
    <GlobalContext.Provider value={{ alertType, setAlertType }}>
      <div className='max-w-[800px] mx-auto p-4'>
        <Component {...pageProps} />
      </div>
      {alertType && <CustomAlert alertType={alertType} setAlertType={setAlertType} />}
    </GlobalContext.Provider>
  )
}
