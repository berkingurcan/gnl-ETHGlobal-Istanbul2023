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
  const [walexecuting, setWalExecuting] = useState(false);
  const [depexecuting, setDepExecuting] = useState(false);
  const [witexecuting, setWitExecuting] = useState(false);

  const [deploying, setDeploying] = useState(false);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  function parseCustomJson(jsonString) {
    // Replace the .private and .public suffixes and format as standard JSON
    let formattedString = jsonString
        .replace(/\.private/g, '"')
        .replace(/\.public/g, '"')
        .replace(/(\w+):/g, '"$1":');

    // Parse and return the JavaScript object
    return JSON.parse(formattedString);
  }

// Parsing the first element of the array


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

    let parsedObject = parseCustomJson(claim_result[0]);

    const owner = parsedObject.owner;
    const amount = parsedObject.amount;

    console.log("Claimed to owner: ", owner);
    console.log("Claimed amount: ", amount);

    setWalExecuting(true);
    
    const create_result = await aleoWorker.localProgramExecution(
      wallet_program,
      "create_wallet",
      [
        owner,
        amount,
        recKey+"field"
      ],
    );

    setWalExecuting(false);
    parsedObject = parseCustomJson(create_result[0]);
    
    console.log("Created wallet with owner: ", parsedObject.owner);
    console.log("Created wallet for token: ", parsedObject.token);
    console.log("Created wallet with recovery key: ", parsedObject.recovery_key);
  }

  async function deposit() {

  }

  async function withdraw() {
      console.log("withdraw key: ", withdrawKey)
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
