import type {
  Payment,
  PaymentMethod,
} from "./paymentTypes";

export async function createPayment(
  amount: number,
  method?: PaymentMethod,
): Promise<Payment> {
  /*
   * Payment provider integration will be added later.
   *
   * Do not put secret payment-provider keys in the client.
   */

  return {
    id: `payment_${Date.now()}`,
    userId: "",
    amount,
    currency: "INR",
    status: "created",
    method,
    provider: undefined,
    providerPaymentId: undefined,
    createdAt: new Date().toISOString(),
  };
}