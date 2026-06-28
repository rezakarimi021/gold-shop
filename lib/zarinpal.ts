const IS_SANDBOX = process.env.ZARINPAL_SANDBOX === "true" || process.env.NODE_ENV !== "production";

const BASE_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/v4/payment"
  : "https://api.zarinpal.com/pg/v4/payment";

const STARTPAY_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/StartPay"
  : "https://www.zarinpal.com/pg/StartPay";

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID ?? "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

interface RequestParams {
  amount: number;
  description: string;
  callback_url: string;
  mobile?: string;
  email?: string;
}

interface RequestResponse {
  data: { code: number; message: string; authority: string; fee: number };
  errors: string[] | Record<string, unknown>;
}

interface VerifyResponse {
  data: { code: number; message: string; ref_id: string; card_pan: string };
  errors: string[] | Record<string, unknown>;
}

export const zarinpal = {
  async requestPayment(params: RequestParams) {
    const res = await fetch(`${BASE_URL}/request.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ merchant_id: MERCHANT_ID, ...params }),
    });

    if (!res.ok) throw new Error(`ZarinPal request HTTP ${res.status}`);

    const json = (await res.json()) as RequestResponse;

    if (json.data.code !== 100) {
      throw new Error(`ZarinPal error ${json.data.code}: ${json.data.message}`);
    }

    return {
      authority: json.data.authority,
      paymentUrl: `${STARTPAY_URL}/${json.data.authority}`,
    };
  },

  async verifyPayment(authority: string, amount: number) {
    const res = await fetch(`${BASE_URL}/verify.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ merchant_id: MERCHANT_ID, authority, amount }),
    });

    if (!res.ok) throw new Error(`ZarinPal verify HTTP ${res.status}`);

    const json = (await res.json()) as VerifyResponse;
    const code = json.data.code;
    const success = code === 100 || code === 101;

    return { success, refId: json.data.ref_id, code };
  },
};
