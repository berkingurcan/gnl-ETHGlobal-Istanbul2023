// The 'wallet' program.
program wallet.aleo {
    // Token for using in the wallet.
    record Token {
        owner: address,
        amount: u64,
        token_id: u64,
    }

    record Wallet {
        owner: address,
        token: u64,
        token_balance: u64,
        recovery_password: field,
    }

    mapping balances: u64 => u64;

    transition claim_token(owner: address, amount: u64, nonce: field) -> Token {
        let id: u64 = Poseidon2::hash_to_u64(nonce);

        return Token {
            owner: owner,
            amount: amount,
            token_id: id,
        };
    }

    transition create_wallet(public owner: address, token_id: u64, recoveryPassword: field) -> Wallet {
        let hashed_password: field = Poseidon2::hash_to_field(recoveryPassword);
        return Wallet {
            owner: owner,
            token: token_id,
            token_balance: 0u64,
            recovery_password: hashed_password,
        };
    }

    transition deposit(wallet: Wallet, amount: u64) -> Wallet {
        let current_balance: u64 = wallet.token_balance + amount;

        let wlt: Wallet = Wallet {
            owner: wallet.owner,
            token: wallet.token,
            token_balance: current_balance,
            recovery_password: wallet.recovery_password,
        };

        return wlt then finalize(wlt.token, current_balance);
    }

    finalize deposit(wallet_token: u64, amount: u64) {
        Mapping::set(balances, wallet_token, amount);
    }

    transition withdraw(wallet: Wallet, amount: u64, recoveryPassword: field) -> Wallet {
        assert_eq(recoveryPassword, wallet.recovery_password);
        let current_balance: u64 = wallet.token_balance - amount;

        let wlt: Wallet = Wallet {
            owner: wallet.owner,
            token: wallet.token,
            token_balance: current_balance,
            recovery_password: wallet.recovery_password,
        };

        return wlt then finalize(wlt.token, current_balance);
    }

    finalize withdraw(wallet_token: u64, amount: u64) {
        Mapping::set(balances, wallet_token, amount);
    }
}
