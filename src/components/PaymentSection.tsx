import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Smartphone, Building2, ArrowLeft, Lock, Check } from "lucide-react";
import { useState } from "react";

interface Plan {
  price: string;
  title: string;
  period: string;
  features: string[];
}

interface PaymentSectionProps {
  plan: Plan;
  onBack: () => void;
}

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI Payment", icon: Smartphone },
  { id: "bank", label: "Net Banking", icon: Building2 },
];

const PaymentSection = ({ plan, onBack }: PaymentSectionProps) => {
  const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-3xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to plans
      </button>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Selected Plan Summary */}
        <div className="md:col-span-2">
          <div className="rounded-2xl border-2 border-primary bg-card p-6 shadow-lg sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Selected Plan
            </p>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              {plan.title}
            </h3>
            <div className="mt-2 mb-4">
              <span className="font-heading text-4xl font-bold text-foreground">
                {plan.price}
              </span>
              <span className="text-muted-foreground text-sm">/{plan.period}</span>
            </div>
            <div className="h-px bg-border mb-4" />
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h4 className="font-heading text-lg font-bold text-foreground mb-5">
              Choose Payment Method
            </h4>

            {/* Method Selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const active = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all text-center ${
                      active
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {selectedMethod === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    />
                  </div>
                </motion.div>
              )}

              {selectedMethod === "upi" && (
                <motion.div
                  key="upi"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You will receive a payment request on your UPI app.
                  </p>
                </motion.div>
              )}

              {selectedMethod === "bank" && (
                <motion.div
                  key="bank"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Select Bank
                    </label>
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition">
                      <option value="">Choose your bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You will be redirected to your bank's secure portal.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Proceed Button */}
            <button className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors">
              <Lock className="h-4 w-4" />
              Proceed to Pay {plan.price}
            </button>

            <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              Secure payment · Demo only
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSection;
