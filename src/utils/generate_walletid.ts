

class WalletId {
    public generate(): string {
        const walletId = Math.random().toString(36).substr(2, 9);
        console.log(walletId);
        return walletId;
    }
}


export default WalletId;