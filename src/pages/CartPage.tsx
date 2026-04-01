import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const SHIPPING_RATE = 20;

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const shipping = items.length > 0 ? SHIPPING_RATE : 0;
  const total = subtotal + shipping;

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Shop Cart
            </h1>
            <ul className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li>/</li>
              <li className="text-primary">Cart</li>
            </ul>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-8">
                  Browse our products and add items to your cart.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Continue Shopping
                </Link>
              </motion.div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  {/* Table Header */}
                  <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-border text-sm font-semibold text-foreground">
                    <span>Product</span>
                    <span className="text-center">Quantity</span>
                    <span className="text-center">Price</span>
                    <span className="text-center">Subtotal</span>
                    <span className="w-8" />
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-border">
                    {items.map((item, i) => (
                      <motion.div
                        key={item.product.slug}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 py-6 items-center"
                      >
                        {/* Product */}
                        <div className="flex items-center gap-4">
                          <Link to={`/shop/${item.product.slug}`} className="shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-20 w-20 rounded-lg object-cover bg-muted border border-border"
                            />
                          </Link>
                          <Link
                            to={`/shop/${item.product.slug}`}
                            className="font-heading font-bold text-foreground hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                              className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="h-10 w-12 flex items-center justify-center text-sm font-semibold text-foreground border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                              className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <span className="text-center text-muted-foreground">
                          ${item.product.price.toFixed(2)}
                        </span>

                        {/* Subtotal */}
                        <span className="text-center font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.slug)}
                          className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors mx-auto"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 border-2 border-foreground text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-foreground hover:text-background transition-colors text-sm"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                    <button
                      onClick={clearCart}
                      className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-2xl border border-border p-8 sticky top-28"
                  >
                    <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                      Cart Total
                    </h3>
                    <ul className="space-y-4 mb-6">
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">
                          Flat rate: ${shipping.toFixed(2)}
                        </span>
                      </li>
                      <li className="h-px bg-border" />
                      <li className="flex items-center justify-between">
                        <span className="font-heading font-bold text-foreground">Total</span>
                        <span className="font-heading text-2xl font-bold text-primary">
                          ${total.toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/contact"
                      className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default CartPage;
