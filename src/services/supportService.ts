import { apiClient } from "@/src/services/api";

export interface BankAccountInfo {
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  swiftCode?: string;
}

export interface CryptoWalletInfo {
  symbol: string;
  network: string;
  address: string;
}

export interface PatronTier {
  id: string;
  name: string;
  priceMonthly: number;
  currency: string;
  description: string;
  perks: string[];
}

export interface PlatformSupportInfo {
  organization: string;
  mission: string;
  banking: {
    localAccount: BankAccountInfo;
    domiciliaryAccount: BankAccountInfo;
  };
  cryptoWallets: {
    bitcoin: CryptoWalletInfo;
    ethereum: CryptoWalletInfo;
    tether: CryptoWalletInfo;
  };
  patronTiers: PatronTier[];
}

export interface DonationInitPayload {
  amount: number;
  email: string;
  currency?: string;
  targetType?: "platform" | "author";
  authorId?: string;
  paymentMethod?: "paystack" | "bank_transfer" | "crypto";
}

export interface DonationInitResult {
  reference: string;
  authorizationUrl?: string;
  accessCode?: string;
  amount: number;
  currency: string;
  message?: string;
}

export interface DonationRecord {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  targetType: "platform" | "author";
  authorId?: string;
  authorName?: string;
  status: "pending" | "success" | "failed";
  paymentMethod: string;
  createdAt: string;
}

/**
 * 5. Patron & Platform Support
 * GET /api/v1/support/platform-info (Public)
 * Returns verified banking details, USD dom account, crypto wallets, and patronage tiers.
 */
export async function getPlatformSupportInfo(): Promise<PlatformSupportInfo | null> {
  try {
    const res = await apiClient.get<any>("/support/platform-info");
    return res?.data || res || null;
  } catch (error) {
    console.warn("[SupportService] Failed to fetch platform support info:", error);
    return null;
  }
}

/**
 * POST /api/v1/support/donations/initialize (Public or Protected)
 * Initiates support payment with Paystack checkout link and unique tracking reference.
 */
export async function initializeDonation(
  payload: DonationInitPayload
): Promise<DonationInitResult> {
  const res = await apiClient.post<any>("/support/donations/initialize", payload);
  const data = res?.data || res || {};
  return {
    reference: data.reference || `INK-${Date.now()}`,
    authorizationUrl: data.authorizationUrl || data.authorization_url,
    accessCode: data.accessCode || data.access_code,
    amount: payload.amount,
    currency: payload.currency || "NGN",
    message: data.message,
  };
}

/**
 * POST /api/v1/support/donations/verify/:reference (Public)
 * Verifies payment, marks donation successful, and sends tip notification to author if targeted.
 */
export async function verifyDonation(
  reference: string
): Promise<{ success: boolean; message: string; donation?: any }> {
  try {
    const res = await apiClient.post<any>(
      `/support/donations/verify/${encodeURIComponent(reference)}`,
      {}
    );
    const data = res?.data || res || {};
    return {
      success: Boolean(res?.success ?? true),
      message: data.message || "Donation verified successfully",
      donation: data.donation || data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to verify donation payment",
    };
  }
}

/**
 * GET /api/v1/support/donations/my (Protected)
 * Returns user donation history.
 */
export async function getMyDonations(): Promise<DonationRecord[]> {
  try {
    const res = await apiClient.get<any>("/support/donations/my");
    const data = res?.data || res || {};
    const list: any[] = data.donations || (Array.isArray(data) ? data : []);
    return list.map((d: any) => ({
      id: String(d._id || d.id || ""),
      reference: d.reference || "",
      amount: Number(d.amount || 0),
      currency: d.currency || "USD",
      targetType: d.targetType || "platform",
      authorId: d.authorId ? String(d.authorId) : undefined,
      authorName: d.authorName,
      status: d.status || "pending",
      paymentMethod: d.paymentMethod || "paystack",
      createdAt: d.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.warn("[SupportService] Failed to fetch user donations:", error);
    return [];
  }
}
