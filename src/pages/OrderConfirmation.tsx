import { Link, useLocation, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderData {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

const paymentLabels: Record<string, string> = {
  bank: "Direct Bank Transfer",
  online: "Online Payment",
  paypal: "PayPal",
};

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state as OrderData | null;

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Order Confirmed</h1>
            <ul className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li>/</li>
              <li className="text-primary">Order Confirmation</li>
            </ul>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-8 text-center mb-8"
            >
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Thank you for your order!</h2>
              <p className="text-muted-foreground mb-1">
                Your order <span className="font-semibold text-foreground">#{order.orderId}</span> has been placed successfully.
              </p>
              <p className="text-sm text-muted-foreground">
                A confirmation will be sent to <span className="font-medium text-foreground">{order.email}</span>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Shipping Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Shipping Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{order.firstName} {order.lastName}</p>
                  <p>{order.street}</p>
                  <p>{order.city}, {order.state} {order.zip}</p>
                  <p>{order.country}</p>
                  <p className="pt-2">{order.phone}</p>
                  <p>{order.email}</p>
                </div>
              </motion.div>

              {/* Payment Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Payment Method</h3>
                <p className="text-sm text-foreground">{paymentLabels[order.paymentMethod] || order.paymentMethod}</p>
              </motion.div>
            </div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6 mb-8"
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-6">Order Items</h3>
              <div className="space-y-4 mb-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-lg object-cover bg-muted border border-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border mb-4" />

              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">${order.subtotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">Flat rate: ${order.shipping.toFixed(2)}</span>
                </li>
                <li className="h-px bg-border" />
                <li className="flex justify-between">
                  <span className="font-heading font-bold text-foreground">Total</span>
                  <span className="font-heading text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
                </li>
              </ul>
            </motion.div>

            <div className="text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default OrderConfirmation;
