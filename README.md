# GNL: Smart Contract Wallet with Recovery Key on ALEO

A groundbreaking ALEO-based smart contract wallet featuring a secure recovery key system. Keep your assets safe and easily recoverable, blending user-friendly access.

My project aims to add value to the ecosystem by providing a simple and user-friendly solution for managing digital assets on the Aleo Blockchain. While the project is still in its early stages and not fully functional, it has the potential to attract users who are looking for a hassle-free way to create, deposit, and withdraw funds through smart contracts.

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


## Instructions to run in development mode

### Build Leo program

After [installations](https://developer.aleo.org/sdk/create-aleo-app/installation), run ```leo run```. So the contract will compile.

### Run the Application

```bash
npm install
npm run install-leo
npm run dev
```

The app should be running on http://localhost:5173/

## Contract Explanation

### Data Structures

#### Token
- `owner`: An `address` type representing the owner of the token.
- `amount`: A `u64` type indicating the quantity of tokens.
- `token_id`: A `u64` type representing a unique identifier for the token.

#### Wallet
- `owner`: An `address` type representing the wallet owner.
- `token`: A `u64` type identifying the token type in the wallet.
- `token_balance`: A `u64` type showing the current balance of tokens in the wallet.
- `recovery_password`: A `field` type used for wallet recovery.

#### Mapping
- `balances`: A mapping from `u64` to `u64`, tracking the balances associated with different wallet tokens.

### Functions

#### claim_token
- **Inputs**:
  - `owner`: Address of the token owner.
  - `amount`: Quantity of tokens to claim.
  - `nonce`: A field to ensure uniqueness.
- **Output**: A new `Token` record.
- **Description**: Creates a new token with a unique ID based on the provided nonce.

#### create_wallet
- **Inputs**:
  - `owner`: Address of the wallet owner.
  - `token_id`: Identifier for the token type.
  - `recoveryPassword`: Password for wallet recovery.
- **Output**: A new `Wallet` record.
- **Description**: Initializes a new wallet with the given owner, token type, and recovery password.

#### deposit
- **Inputs**:
  - `wallet`: The wallet to deposit into.
  - `amount`: Amount of tokens to deposit.
- **Output**: Updated `Wallet` record.
- **Description**: Deposits the specified amount into the wallet and updates the balance.

#### withdraw
- **Inputs**:
  - `wallet`: The wallet to withdraw from.
  - `amount`: Amount of tokens to withdraw.
  - `recoveryPassword`: Password for transaction validation.
- **Output**: Updated `Wallet` record.
- **Description**: Withdraws the specified amount from the wallet after validating the recovery password.

-----------------------------

## Challenges and Roadblocks I faced

I have encountered this error while trying to pass record as a parameter and I could not solve it:
```
Input record for 'wallet.aleo' must belong to the signer
```

In the React template worker.js #21:
Correct version should be like that:
```
const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false,
);
```
