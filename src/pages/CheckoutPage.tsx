import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SHIPPING_RATE = 20;

const requiredFields = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "country", label: "Country" },
  { key: "street", label: "Street Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zip", label: "ZIP Code" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
] as const;

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
    if (submitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const { key, label } of requiredFields) {
      if (!form[key].trim()) {
        newErrors[key] = `${label} is required`;
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (form.phone && !/^[\d\s\-+()]{7,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
    return newErrors;
  };

  const [placing, setPlacing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setPlacing(true);
    const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

    try {
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
          payment_method: form.paymentMethod,
          notes: form.notes,
          subtotal,
          shipping,
          total,
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.product.name,
        product_image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      const orderData = {
        orderId: orderNumber,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        items: items.map((item) => ({
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
        })),
        subtotal,
        shipping,
        total,
      };

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-confirmation", { state: orderData });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
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
                          placeholder="First Name"
                          className={`w-full rounded-lg border ${errors.firstName ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          className={`w-full rounded-lg border ${errors.lastName ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Country / Region *</label>
                        <select
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className={`w-full rounded-lg border ${errors.country ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                        {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="street"
                          value={form.street}
                          onChange={handleChange}
                          placeholder="Street address"
                          className={`w-full rounded-lg border ${errors.street ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.street && <p className="text-destructive text-xs mt-1">{errors.street}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Town / City *</label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="Town / City"
                          className={`w-full rounded-lg border ${errors.city ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          placeholder="State"
                          className={`w-full rounded-lg border ${errors.state ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          placeholder="ZIP Code"
                          className={`w-full rounded-lg border ${errors.zip ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.zip && <p className="text-destructive text-xs mt-1">{errors.zip}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Phone"
                          className={`w-full rounded-lg border ${errors.phone ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Email address"
                          className={`w-full rounded-lg border ${errors.email ? 'border-destructive' : 'border-border'} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30`}
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
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
                    <div className="mb-6">
                      <label className="flex items-start gap-3 cursor-pointer">
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
                      {errors.agreeTerms && <p className="text-destructive text-xs mt-1">{errors.agreeTerms}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={placing}
                      className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {placing ? "Placing Order..." : "Place Order"}
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
