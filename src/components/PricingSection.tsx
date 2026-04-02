import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import PaymentSection from "./PaymentSection";

interface Plan {
  price: string;
  title: string;
  period: string;
  features: string[];
  accent: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    price: "$49",
    title: "Starter",
    period: "Monthly",
    features: [
      "Nursing homes care",
      "Hospice",
      "Community Nursing",
      "24/7 support",
    ],
    accent: "border-accent",
  },
  {
    price: "$69",
    title: "Classic",
    period: "Monthly",
    features: [
      "Nursing homes care",
      "Hospice",
      "Community Nursing",
      "24/7 support",
    ],
    accent: "border-primary",
    popular: true,
  },
  {
    price: "$99",
    title: "Premium",
    period: "Monthly",
    features: [
      "Nursing homes care",
      "Hospice",
      "Community Nursing",
      "24/7 support",
    ],
    accent: "border-accent",
  },
];

interface PricingSectionProps {
  showHeader?: boolean;
}

const PricingSection = ({ showHeader = true }: PricingSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full border-2 border-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Pricing Plan
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              The Best Price Is What We
              <br className="hidden sm:block" /> Are Offering!
            </h2>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!selectedPlan ? (
            <motion.div
              key="plans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative rounded-2xl border-2 ${plan.accent} bg-card p-8 text-center shadow-sm hover:shadow-xl transition-shadow ${
                    plan.popular ? "ring-2 ring-primary/30 scale-[1.02]" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="font-heading text-5xl font-bold text-foreground">
                      {plan.price}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">{plan.period}</p>

                  <div className="h-px bg-border mb-6" />

                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className={`inline-block w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    Select Plan
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <PaymentSection
              key="payment"
              plan={selectedPlan}
              onBack={() => setSelectedPlan(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingSection;
