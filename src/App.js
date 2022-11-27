import { chain, configureChains, WagmiConfig, createClient, useAccount } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';
import configJson from './config.json'

// Configure chains & providers with the Infura provider.
const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [infuraProvider({ apiKey: configJson.infura_api_key })],
)

// Set up wagmi client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function App() {
  const { address, isConnected } = useAccount();

  return (
    <WagmiConfig client={client}>
      <div className='overlay'>
        <div className="App">
          <NavBar isConnected={isConnected} />
          <MainMint isConnected={isConnected} />
        </div>
        <div className='moving-background'></div>
      </div>
    </WagmiConfig>
  );
}

export default App;
