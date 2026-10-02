export type WalletTransactionType =
  | "credit"
  | "debit";

export type WalletTransactionStatus =
  | "completed"
  | "pending"
  | "failed";

export type WalletTransaction = {
  id: string;
  type: WalletTransactionType;
  amount: number;
  description: string;
  status: WalletTransactionStatus;
  createdAt: string;
};

export type Wallet = {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
};