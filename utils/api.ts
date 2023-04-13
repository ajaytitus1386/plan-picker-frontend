const BASE_URL = "https://plan-picker-backend.vercel.app";

const AUTH_URL = `${BASE_URL}/user`;
const PLAN_URL = `${BASE_URL}/plans`;
const SUB_URL = `${BASE_URL}/subscriptions`;
const STRIPE_URL = `${BASE_URL}/stripe`;

export const ROUTES = {
  AUTH: {
    LOGIN: `${AUTH_URL}/login`,
    SIGNUP: `${AUTH_URL}/signup`,
    VERIFY: `${AUTH_URL}/me`, // jwt is sent in headers as token
  },
  PLAN: {
    GET_ALL: `${PLAN_URL}/fetch`,
    GET_ONE: (id: string) => `${PLAN_URL}/fetch/${id}`,
  },
  SUBSCRIPTION: {
    CREATE: `${SUB_URL}/create`,
    GET_BY_ID: `${SUB_URL}/fetch`, // user Id in query
    CANCEL: (subId: string) => `${SUB_URL}/cancel/${subId}`,
  },
  STRIPE: {
    CREATE: `${STRIPE_URL}/create`,
    CANCEL: `${STRIPE_URL}/cancel`,
  },
};
