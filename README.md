This is done by React + Hardhat + Infura + ...

Following the below to install dependencies

---- React App ----
Install React App
npx create-react-app nft-mint-site

Install Chakra UI
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

Install Ethers
npm i ethers

Install Wagmi
npm i wagmi

Install Buffer
npm i buffer

Execute the React app
npm run start

---- Solidity Contract ----
Install Hardhat (inside contract folder)
npm i -D hardhat
npx hardhat
npm install --save-dev "hardhat@^2.12.2" "@nomicfoundation/hardhat-toolbox@^2.0.0"

Install Openzeppelin
npm i @openzeppelin/contracts

Install dotenv
npm i -D dotenv

Deploy contract to Goerli
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli

contract address: 0xA21eBa201519F37760d86e12B9432aBb6A0B9c4b

Verify contract
npm i -D @nomiclabs/hardhat-etherscan
npx hardhat verify --network goerli 0xA21eBa201519F37760d86e12B9432aBb6A0B9c4b
