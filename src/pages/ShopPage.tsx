import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";
import product5 from "@/assets/products/product-5.jpg";
import product6 from "@/assets/products/product-6.jpg";
import product7 from "@/assets/products/product-7.jpg";
import product8 from "@/assets/products/product-8.jpg";
import product9 from "@/assets/products/product-9.jpg";

const products = [
  { name: "Pressure Monitor", price: 150, image: product1, sale: true, rating: 4 },
  { name: "Comfort Wheelchair", price: 200, oldPrice: 250, image: product2, rating: 4 },
  { name: "Walking Cane", price: 45, image: product3, sale: true, rating: 5 },
  { name: "Digital Thermometer", price: 30, image: product4, sale: true, rating: 4 },
  { name: "First Aid Kit", price: 120, oldPrice: 150, image: product5, rating: 4 },
  { name: "Pill Organizer", price: 25, image: product6, sale: true, rating: 5 },
  { name: "Pulse Oximeter", price: 60, image: product7, sale: true, rating: 4 },
  { name: "Home Care Bed", price: 899, oldPrice: 1099, image: product8, rating: 5 },
  { name: "Comfort Chair", price: 350, image: product9, sale: true, rating: 4 },
];

const ShopPage = () => (
  <PageTransition>
    <Navbar />
    <main className="pt-24">
      {/* Page Header */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Shop
          </h1>
          <ul className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-primary">Products</li>
          </ul>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-muted aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.sale && (
                    <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                  {/* Hover overlay with Shop Now */}
                  <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to="/contact"
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Shop Now
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-heading text-xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-4 w-4 ${
                          si < product.rating
                            ? "fill-accent text-accent"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </PageTransition>
);

export default ShopPage;
