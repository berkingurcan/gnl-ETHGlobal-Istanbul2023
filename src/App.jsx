import { useState } from "react";
import "./App.css";
import wallet_program from "../wallet/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";

const aleoWorker = AleoWorker();
function App() {
  const [recKey, setRecKey] = useState(0);
  const [withdrawKey, setWithdrawKey] = useState(0);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [walexecuting, setWalExecuting] = useState(false);
  const [depexecuting, setDepExecuting] = useState(false);
  const [witexecuting, setWitExecuting] = useState(false);

  const [deploying, setDeploying] = useState(false);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function createWallet() {
    setWalExecuting(true);
    // using address and nonce and amount for the sake of simplicity
    const claim_result = await aleoWorker.localProgramExecution(
      wallet_program,
      "claim_token",
      [
        "aleo13ssze66adjjkt795z9u5wpq8h6kn0y2657726h4h3e3wfnez4vqsm3008q",
        "5u64",
        "42field"
      ],
    );
    setWalExecuting(false);

    const regex = /token_id: (\d+)u64\.private/;
    const match = claim_result[0].match(regex);
    let tokenId;

    if (match) {
      tokenId = match[1];
    } else {
      console.log('Token ID not found');
    }

    setWalExecuting(true);
    
    const create_result = await aleoWorker.localProgramExecution(
      wallet_program,
      "create_wallet",
      [
        "aleo13ssze66adjjkt795z9u5wpq8h6kn0y2657726h4h3e3wfnez4vqsm3008q",
        tokenId+"u64",
        recKey+"field"
      ],
    );

    setWalExecuting(false);
    console.log("Created wallet: ", create_result[0]);

    setWallet(create_result[0]);
  }

  async function deposit() {
    setDepExecuting(true);
    const deposit_result = await aleoWorker.localProgramExecution(
      wallet_program,
      "deposit",
      [
        wallet,
        amount+"u64",
      ],
    );

    setDepExecuting(false);
    console.log("Deposited: ", deposit_result[0]);
  }

  async function withdraw() {
    setWitExecuting(true);
    const withdraw_result = await aleoWorker.localProgramExecution(
      wallet_program,
      "withdraw",
      [
        wallet,
        amount+"u64",
        withdrawKey+"field",
      ],
    );

    setWitExecuting(false);
    console.log("Withdrawn: ", withdraw_result[0]);
  }

  return (
    <>
      <div>
        
      </div>
      <h1>GNL Smart Contract Wallet with Recovery Key</h1>
      <div className="card">
        <input placeholder="Recovery Key" onChange={(e) => setRecKey(e.target.value)}></input>
        <br />
        <br />
        <button disabled={walexecuting} onClick={createWallet}>
          {walexecuting
              ? `Creating...check console for details...`
              : `Claim Token and Create Wallet`}
        </button>
        <p>
          <input placeholder="Withdraw/Deposit Amount" onChange={(e) => setAmount(e.target.value)}></input>
          <br />
          <br />
          <button disabled={depexecuting} onClick={deposit}>
          {depexecuting
              ? `Depositing..check console for details...`
              : `Deposit`}
          </button>
        </p>
        <p>
          <input placeholder="Withdraw recovery key" onChange={(e) => setWithdrawKey(e.target.value)}></input>
          <br />
          <br />
          <button disabled={witexecuting} onClick={withdraw}>
            {witexecuting
              ? `Withdrawing...check console for details...`
              : `Withdraw`}
          </button>
        </p>
      </div>
    </>
  );
}

export default App;
