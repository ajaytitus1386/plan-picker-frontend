export interface Plan {
  id: String;
  planName: String;
  monthlyPrice: Number;
  yearlyPrice: Number;
  videoQuality: String;
  resolution: String;
  devices: String;
  screens: Number;
}

export function planFromJSON(json: any): Plan {
  return {
    id: json["_id"],
    planName: json["planName"],
    monthlyPrice: json["monthlyPrice"],
    yearlyPrice: json["yearlyPrice"],
    videoQuality: json["videoQuality"],
    resolution: json["resolution"],
    devices: json["devices"],
    screens: json["screens"],
  };
}
