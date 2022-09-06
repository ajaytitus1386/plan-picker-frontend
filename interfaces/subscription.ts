export interface Subscription {
  userId: String;
  planId: String;
  billingCycle: String;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
  creditCardNumber: String;
  creditCardExpiry: String;
  creditCardCvv: String;
}
