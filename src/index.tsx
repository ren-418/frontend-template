import React from 'react';
import ReactDOM from 'react-dom';
import {UseWalletProvider} from 'use-wallet'
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {configureStore} from '@reduxjs/toolkit';
import Slice from './reducer'
import StyledThemeProvider from './theme'
import config from './config.json'

const store = configureStore({reducer: Slice.reducer});

ReactDOM.render(
	<UseWalletProvider
        // autoConnect={true}
        connectors={{
          injected: { chainId: [1, 2, 3, config.CHAINID, 5, 97, 250, 4002, 42161] },
          walletconnect: {
            rpc: {
              5: "https://rpc.ankr.com/eth_goerli",
              97: "https://bsc-testnet.public.blastapi.io",
              250: "https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac",
              4002: "https://fantom-testnet.public.blastapi.io",
              421613: "https://goerli-rollup.arbitrum.io/rpc"
            },
          },
        }}
      >
		<Provider store = {store}>
			<React.StrictMode>
				<StyledThemeProvider>
					<App />
				</StyledThemeProvider>
			</React.StrictMode>
		</Provider>,
      </UseWalletProvider>,
	document.getElementById('root')
);

reportWebVitals();
