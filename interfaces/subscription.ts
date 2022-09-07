export interface Subscription {
  id: string;
  userId: String;
  planId: String;
  billingCycle: String;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
  stripeSubId: string;
}

export function subscriptionFromJSON(json: any): Subscription {
  return {
    id: json["_id"],
    userId: json["userId"],
    planId: json["planId"],
    billingCycle: json["billingCycle"],
    startDate: json["startDate"],
    endDate: json["endDate"],
    isActive: json["isActive"],
    stripeSubId: json["stripeSubId"],
  };
}
