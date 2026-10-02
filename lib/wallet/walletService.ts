import type {
  Wallet,
  WalletTransaction,
} from "./walletTypes";

export async function getWallet(): Promise<Wallet> {
  /*
   * Temporary wallet data.
   *
   * Replace this with Supabase wallet queries
   * when the wallet database tables are implemented.
   */

  const transactions: WalletTransaction[] = [];

  return {
    balance: 100,
    currency: "INR",
    transactions,
  };
}