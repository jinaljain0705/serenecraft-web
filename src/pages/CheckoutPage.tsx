import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const SHIPPING_RATE = 20;

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = items.length > 0 ? SHIPPING_RATE : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "online",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    clearCart();
    toast.success("Order placed successfully!", {
      description: "Thank you for your purchase. We'll send a confirmation to your email.",
    });
    navigate("/shop");
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <Navbar />
        <main className="pt-24">
          <section className="bg-primary/10 py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Checkout</h1>
            </div>
          </section>
          <div className="container mx-auto px-4 py-20 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        {/* Header */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Checkout</h1>
            <ul className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Cart</Link></li>
              <li>/</li>
              <li className="text-primary">Checkout</li>
            </ul>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-10">
                {/* Billing Form */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl border border-border p-8"
                  >
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Billing Details</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          placeholder="First Name"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Last Name"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Country / Region *</label>
                        <select
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="street"
                          value={form.street}
                          onChange={handleChange}
                          required
                          placeholder="Street address"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Town / City *</label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                          placeholder="Town / City"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          required
                          placeholder="State"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          required
                          placeholder="ZIP Code"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="Phone"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="Email address"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Order Notes (optional)</label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Notes about your order"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Order Summary + Payment */}
                <div className="lg:col-span-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card rounded-2xl border border-border p-8 sticky top-28"
                  >
                    <h3 className="font-heading text-xl font-bold text-foreground mb-6">Order Summary</h3>

                    {/* Items */}
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.product.slug} className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-14 w-14 rounded-lg object-cover bg-muted border border-border shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-foreground shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-border mb-4" />

                    {/* Totals */}
                    <ul className="space-y-3 mb-6">
                      <li className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">Flat rate: ${shipping.toFixed(2)}</span>
                      </li>
                      <li className="h-px bg-border" />
                      <li className="flex justify-between">
                        <span className="font-heading font-bold text-foreground">Total</span>
                        <span className="font-heading text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                      </li>
                    </ul>

                    <div className="h-px bg-border mb-6" />

                    {/* Payment Method */}
                    <h4 className="font-heading text-lg font-bold text-foreground mb-4">Payment Method</h4>
                    <div className="space-y-3 mb-6">
                      {[
                        { value: "bank", label: "Direct Bank Transfer" },
                        { value: "online", label: "Online Payment" },
                        { value: "paypal", label: "PayPal" },
                      ].map((method) => (
                        <label key={method.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={form.paymentMethod === method.value}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary accent-primary"
                          />
                          <span className="text-sm text-foreground">{method.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer mb-6">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={form.agreeTerms as boolean}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 accent-primary"
                      />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        I have read and agree to the website terms and conditions *
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Place Order
                    </button>
                  </motion.div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default CheckoutPage;
