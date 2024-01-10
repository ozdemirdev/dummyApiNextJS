import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { useEffect } from "react";
import { Provider } from 'react-redux';
import store from '@/store/store';


export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>

  )
}
