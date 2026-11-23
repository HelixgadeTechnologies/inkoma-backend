"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  CreditCard,
  Building2,
  Globe,
  Sparkles,
  Check,
  Copy,
  ShieldCheck,
  Award,
  ArrowRight,
  Zap,
  DollarSign,
  Coffee,
  Coins,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  getPlatformSupportInfo,
  initializeDonation,
  PlatformSupportInfo,
} from "@/src/services/supportService";

type PaymentMethod = "paystack" | "bank_transfer" | "other";

export default function SupportInkomaPage() {
  const { user } = useAuth();
  const [platformInfo, setPlatformInfo] = useState<PlatformSupportInfo | null>(null);
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>("paystack");
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedLocal, setCopiedLocal] = useState(false);
  const [copiedDom, setCopiedDom] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [payRef, setPayRef] = useState("");

  useEffect(() => {
    async function loadSupportInfo() {
      const info = await getPlatformSupportInfo();
      if (info) {
        setPlatformInfo(info);
      }
    }
    loadSupportInfo();
  }, []);

  const localAccNo = platformInfo?.banking?.localAccount?.accountNumber || "1029384756";
  const localBankName = platformInfo?.banking?.localAccount?.bankName || "Zenith Bank Nigeria";
  const localAccName = platformInfo?.banking?.localAccount?.accountName || "Inkoma Oral Heritage Initiative";

  const domAccNo = platformInfo?.banking?.domiciliaryAccount?.accountNumber || "0293847561";
  const domBankName = platformInfo?.banking?.domiciliaryAccount?.bankName || "Guaranty Trust Bank (GTBank)";
  const domAccName = platformInfo?.banking?.domiciliaryAccount?.accountName || "Inkoma Global Heritage Ltd";
  const domSwift = platformInfo?.banking?.domiciliaryAccount?.swiftCode || "GTBINGLA";

  const cryptoWallet = platformInfo?.cryptoWallets?.ethereum?.address || "0x71C849204A3b2075D1c29E04f21F1a21C0c2262E";
  const btcWallet = platformInfo?.cryptoWallets?.bitcoin?.address || "bc1q9x3t0g7g78g0dfy876s8fgh6k7l59f0g4d3s8h";

  const copyToClipboard = (text: string, type: "local" | "dom" | "crypto") => {
    navigator.clipboard.writeText(text);
    if (type === "local") {
      setCopiedLocal(true);
      setTimeout(() => setCopiedLocal(false), 2500);
    } else if (type === "dom") {
      setCopiedDom(true);
      setTimeout(() => setCopiedDom(false), 2500);
    } else if (type === "crypto") {
      setCopiedCrypto(true);
      setTimeout(() => setCopiedCrypto(false), 2500);
    }
  };

  const amountToPay = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handlePaystackPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amountToPay <= 0) return;

    setIsProcessing(true);
    setPaymentError(null);
    try {
      const initResult = await initializeDonation({
        amount: amountToPay,
        email: user?.email || "supporter@inkoma.com",
        paymentMethod: "paystack",
        currency: "USD",
        targetType: "platform",
      });

      if (initResult.authorizationUrl) {
        window.location.href = initResult.authorizationUrl;
      } else {
        setPayRef(initResult.reference);
        setPaymentSuccess(true);
      }
    } catch (err: any) {
      console.error("Failed to initialize donation payment:", err);
      setPaymentError(
        err?.message || "Failed to initialize payment gateway. Please try again or select an alternative payment method."
      );
      setPaymentSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#B8860B] text-xs font-black uppercase tracking-wider shadow-xs">
          <Heart className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
          Official INKOMA Patron &amp; Creator Fund
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight">
          Support <span className="text-[#B8860B]">INKOMA</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
          Help us empower independent African storytellers, digitize indigenous oral lore, and fund open community archiving tools.
        </p>
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Payment Method Selection & Checkout */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="space-y-2 border-b border-stone-100 pb-5">
            <h2 className="text-xl font-black text-stone-950 flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#B8860B]" />
              Select Payment Method
            </h2>
            <p className="text-xs text-stone-600">
              Choose how you would like to financially support the INKOMA platform foundation.
            </p>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#FAF8F5] rounded-2xl border border-stone-200">
            <button
              onClick={() => { setActiveMethod("paystack"); setPaymentSuccess(false); setPaymentError(null); }}
              className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center gap-1.5 ${
                activeMethod === "paystack"
                  ? "bg-white text-stone-950 shadow-md border border-[#D4AF37]"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#B8860B]" />
              <span>Paystack</span>
            </button>

            <button
              onClick={() => { setActiveMethod("bank_transfer"); setPaymentSuccess(false); setPaymentError(null); }}
              className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center gap-1.5 ${
                activeMethod === "bank_transfer"
                  ? "bg-white text-stone-950 shadow-md border border-[#D4AF37]"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Building2 className="w-4 h-4 text-[#B8860B]" />
              <span>Bank Transfer</span>
            </button>

            <button
              onClick={() => { setActiveMethod("other"); setPaymentSuccess(false); setPaymentError(null); }}
              className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center gap-1.5 ${
                activeMethod === "other"
                  ? "bg-white text-stone-950 shadow-md border border-[#D4AF37]"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Globe className="w-4 h-4 text-[#B8860B]" />
              <span>Other Methods</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* METHOD 1: PAYSTACK */}
          {/* ========================================================================= */}
          {activeMethod === "paystack" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider block">
                  Choose Contribution Amount ($ USD / ₦ NGN)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {[5, 10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-xl border text-xs font-black transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "bg-[#D4AF37] text-stone-950 border-[#D4AF37] shadow-md scale-[1.03]"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:border-[#D4AF37]"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-xs font-bold text-stone-600 mb-1.5 block">
                    Or Enter Custom Support Amount ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      type="number"
                      placeholder="e.g. 75"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-9 bg-white border-stone-300 text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {paymentError && (
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 space-y-1 animate-in fade-in duration-200">
                  <div className="font-bold flex items-center gap-1.5 text-rose-900">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Payment Initialization Failed</span>
                  </div>
                  <p className="text-rose-700 leading-relaxed">{paymentError}</p>
                </div>
              )}

              {paymentSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-base font-black text-emerald-950">Thank You for Supporting INKOMA!</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                    Your contribution of <span className="font-extrabold">${amountToPay}</span> has been processed via Paystack. Your patron support helps us archive indigenous stories and compensate African writers directly.
                  </p>
                  <Button
                    onClick={() => setPaymentSuccess(false)}
                    variant="outline"
                    className="border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-bold rounded-xl mt-2"
                  >
                    Make Another Contribution
                  </Button>
                </div>
              ) : (
                <form onSubmit={handlePaystackPay} className="space-y-4">
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
                    <div className="flex items-center justify-between font-bold text-stone-900">
                      <span>Supported Payment Cards &amp; Channels:</span>
                      <span className="text-[#B8860B]">Powered by Paystack</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Accepts Visa, Mastercard, Verve, Apple Pay, Bank Transfer &amp; USSD. Transactions are 256-bit encrypted.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing || amountToPay <= 0}
                    className="w-full bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-black py-6 text-sm rounded-xl shadow-md gap-2"
                  >
                    {isProcessing ? (
                      <span>Connecting to Paystack...</span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-stone-950 text-stone-950" />
                        <span>Support INKOMA with Paystack (${amountToPay})</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* METHOD 2: BANK TRANSFER */}
          {/* ========================================================================= */}
          {activeMethod === "bank_transfer" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <p className="text-xs text-stone-600 leading-relaxed">
                You can make a direct bank deposit or wire transfer to our official foundation bank accounts. Please specify <span className="font-extrabold text-stone-900">"INKOMA Support"</span> in the payment narration.
              </p>

              {/* Local Account Box */}
              <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                    🇳🇬 Local Bank Transfer (NGN / Naira)
                  </span>
                  <span className="text-xs font-bold text-stone-500">{localBankName}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Bank Name</span>
                    <span className="font-bold text-stone-900 text-sm">{localBankName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Account Name</span>
                    <span className="font-bold text-stone-900 text-sm">{localAccName}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between p-3 bg-white rounded-xl border border-stone-300">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase font-bold">Account Number</span>
                    <span className="font-mono font-black text-lg text-stone-950 tracking-wider">{localAccNo}</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(localAccNo, "local")}
                    size="sm"
                    variant="outline"
                    className="border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/15 rounded-lg text-xs font-bold gap-1.5"
                  >
                    {copiedLocal ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Acc No</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Domiciliary / Foreign Account Box */}
              <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-extrabold uppercase tracking-wider">
                    🌐 International Wire / Domiciliary (USD)
                  </span>
                  <span className="text-xs font-bold text-stone-500">{domBankName}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">SWIFT / BIC Code</span>
                    <span className="font-bold text-stone-900 text-sm font-mono">{domSwift}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Account Name</span>
                    <span className="font-bold text-stone-900 text-sm">{domAccName}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-300">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase font-bold">USD Domiciliary Acc No</span>
                    <span className="font-mono font-black text-lg text-stone-950 tracking-wider">{domAccNo}</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(domAccNo, "dom")}
                    size="sm"
                    variant="outline"
                    className="border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/15 rounded-lg text-xs font-bold gap-1.5"
                  >
                    {copiedDom ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Acc No</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* METHOD 3: OTHER PAYMENT METHODS */}
          {/* ========================================================================= */}
          {activeMethod === "other" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider">
                  Mobile Money &amp; Global Payment Channels
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg text-[#B8860B]">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">Flutterwave &amp; MoMo</h4>
                      <p className="text-[10px] text-stone-500">M-Pesa, MTN MoMo, Airtel Money</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center gap-3">
                    <div className="p-2 bg-rose-100 rounded-lg text-rose-700">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">Patreon &amp; Ko-fi</h4>
                      <p className="text-[10px] text-stone-500">Monthly lore patron memberships</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto / USDT Support */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#B8860B]" />
                  Crypto / USDT Support Address
                </h3>
                <p className="text-xs text-stone-500">
                  You can also support the folklore archive using USDT (ERC-20 / TRC-20):
                </p>
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-300">
                  <span className="font-mono text-xs font-bold text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                    {cryptoWallet}
                  </span>
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(cryptoWallet, "crypto")}
                    size="sm"
                    variant="outline"
                    className="border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/15 rounded-lg text-xs font-bold gap-1.5"
                  >
                    {copiedCrypto ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Wallet</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Transparency & Impact Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B8860B] text-[10px] font-extrabold uppercase tracking-wider border border-[#D4AF37]/30">
                100% Transparency Guarantee
              </span>
              <h3 className="text-xl font-black text-stone-950 pt-1">Where Your Support Goes</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                INKOMA is dedicated to direct community impact and lore preservation.
              </p>
            </div>

            {/* Impact Percentage Bars */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-stone-900">
                  <span>Author Grants &amp; Creator Stipends</span>
                  <span className="text-[#B8860B]">60%</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full w-[60%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-stone-900">
                  <span>Elder Audio Recording &amp; Dialect Preservation</span>
                  <span className="text-[#B8860B]">25%</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#B8860B] rounded-full w-[25%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-stone-900">
                  <span>Platform Infrastructure &amp; Server Hosting</span>
                  <span className="text-[#B8860B]">15%</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-700 rounded-full w-[15%]" />
                </div>
              </div>
            </div>

            {/* Patron Perks */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#B8860B]" /> Patron Rewards
              </h4>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Golden Patron Badge on your profile &amp; comments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Early access to newly published folklore chapters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Invitation to monthly elder narration audio listening parties</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Need help instead? Link to Help Center */}
          <div className="p-5 bg-stone-900 text-white rounded-3xl space-y-2 text-center shadow-lg">
            <h4 className="text-sm font-extrabold text-[#D4AF37]">Looking for Help or Assistance?</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              If you have questions about reading, authoring, or technical help, please visit our Help Center.
            </p>
            <div className="pt-1">
              <Link href="/help">
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20 text-xs font-bold rounded-xl px-5 h-9 bg-transparent">
                  Go to Help Center &amp; FAQs <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
