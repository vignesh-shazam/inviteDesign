export type PaymentStatus =
  | "created"
  | "pending"
  | "completed"
  | "failed"
  | "cancelled";

export type PaymentMethod =
  | "upi"
  | "card"
  | "netbanking"
  | "wallet";

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  provider?: string;
  providerPaymentId?: string;
  createdAt: string;
};