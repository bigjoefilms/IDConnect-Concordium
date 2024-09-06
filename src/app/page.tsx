// /pages/_app.tsx
"use client"
import { TESTNET, WithWalletConnector } from '@concordium/react-components';
import { AppProps } from 'next/app';
import CharityDAO from './component/Store';

function MyApp({ Component, pageProps }: AppProps) {
    return (
      
      <CharityDAO  />
      
                   
    );
}

export default MyApp;
