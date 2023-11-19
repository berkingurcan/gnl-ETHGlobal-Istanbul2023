# GNL: Smart Contract Wallet with Recovery Key on ALEO

A groundbreaking ALEO-based smart contract wallet featuring a secure recovery key system. Keep your assets safe and easily recoverable, blending user-friendly access.

## Description
GNL is a smart contract wallet built on the Aleo Blockchain, offering a secure and user-friendly solution for managing digital assets. With GNL, users can create wallets for their tokens, deposit and withdraw funds through smart contracts provided by the recovery key system. 

Utilizing zero-knowledge proofs on Aleo network, GNL ensures that transactions and sensitive user data remain private and confidential. The integration of zk technology enhances the overall security and privacy of the wallet, giving users peace of mind when managing their assets on the Aleo Blockchain.

It has simple user interface and Aleo Smart Contract infrastructure which is written with Leo. I used Create Aleo App React template for UI and Smart Contract integration. I wrote wallet smart contract with Leo. While creating Wallet record user embeds private recovery password and while withdrawing their funds, it is need to be passed in the withdraw function. Then I built very simple user interface for functions of the contract and integrated them with the contract which is running offline.

### Key Features:

- Smart contract functionality for creating, depositing, and withdrawing funds via recovery key
- Utilization of Aleo Blockchain for enhanced privacy and security

### Future Improvements:

- Completing UI Functionalities
- Implementing detailed Token contract and functionalities
- Implementation of a multi-signature feature to provide an extra layer of security
- Integration of a decentralized identity (DID) system to enhance user privacy and security when accessing the GNL wallet.


### Start in development mode

```bash
npm run dev
```

Your app should be running on http://localhost:5173/

### Build Leo program

After [installations](https://developer.aleo.org/sdk/create-aleo-app/tutorial), run ```leo run```. So the contract will compile.
