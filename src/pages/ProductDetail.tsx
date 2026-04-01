import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Check, ArrowLeft, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <PageTransition>
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
      action: { label: "View Cart", onClick: () => window.location.href = "/cart" },
    });
    setQuantity(1);
  };

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <ul className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li>/</li>
              <li className="text-primary">{product.name}</li>
            </ul>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative rounded-2xl overflow-hidden bg-muted border border-border"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width={512}
                  height={512}
                  className="w-full aspect-square object-cover"
                />
                {product.sale && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {product.category}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < product.rating ? "fill-accent text-accent" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating}.0 Rating)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-heading text-4xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Details */}
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-12 w-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="h-12 w-14 flex items-center justify-center text-sm font-semibold text-foreground border-x border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="h-12 w-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors h-12"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                </div>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shop
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
                Related Products
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {related.map((rp, i) => (
                  <motion.div
                    key={rp.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <Link to={`/shop/${rp.slug}`} className="block">
                      <div className="relative overflow-hidden bg-muted aspect-square">
                        <img
                          src={rp.image}
                          alt={rp.name}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {rp.sale && (
                          <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                            Sale
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">{rp.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-xl font-bold text-primary">${rp.price.toFixed(2)}</span>
                          {rp.oldPrice && (
                            <span className="text-sm text-muted-foreground line-through">${rp.oldPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </PageTransition>
  );
};

export default ProductDetail;
