program wallet.aleo;

record Token:
    owner as address.private;
    amount as u64.private;
    token_id as u64.private;

record Wallet:
    owner as address.private;
    token as u64.private;
    token_balance as u64.private;
    recovery_password as field.private;


mapping balances:
	key as u64.public;
	value as u64.public;

function claim_token:
    input r0 as address.private;
    input r1 as u64.private;
    input r2 as field.private;
    hash.psd2 r2 into r3 as u64;
    cast r0 r1 r3 into r4 as Token.record;
    output r4 as Token.record;


function create_wallet:
    input r0 as address.public;
    input r1 as u64.private;
    input r2 as field.private;
    hash.psd2 r2 into r3 as field;
    cast r0 r1 0u64 r3 into r4 as Wallet.record;
    output r4 as Wallet.record;


function deposit:
    input r0 as Wallet.record;
    input r1 as u64.private;
    add r0.token_balance r1 into r2;
    cast r0.owner r0.token r2 r0.recovery_password into r3 as Wallet.record;
    async deposit r3.token r2 into r4;
    output r3 as Wallet.record;
    output r4 as wallet.aleo/deposit.future;

finalize deposit:
    input r0 as u64.public;
    input r1 as u64.public;
    set r1 into balances[r0];


function withdraw:
    input r0 as Wallet.record;
    input r1 as u64.private;
    input r2 as field.private;
    assert.eq r2 r0.recovery_password;
    sub r0.token_balance r1 into r3;
    cast r0.owner r0.token r3 r0.recovery_password into r4 as Wallet.record;
    async withdraw r4.token r3 into r5;
    output r4 as Wallet.record;
    output r5 as wallet.aleo/withdraw.future;

finalize withdraw:
    input r0 as u64.public;
    input r1 as u64.public;
    set r1 into balances[r0];
