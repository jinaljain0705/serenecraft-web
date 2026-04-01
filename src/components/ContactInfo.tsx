import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Please Don't Hesitate To Contact Us With Any Inquiries
            </h2>
            <p className="text-muted-foreground">
              You can also reach out to us by phone or email
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">Our Address</h4>
                  <p className="text-muted-foreground text-sm">
                    130 Granite Run Drive Suite<br />
                    Hobert, CA 10010, USA.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">Support</h4>
                  <p className="text-muted-foreground text-sm">
                    <a href="tel:+00881745651" className="hover:text-primary transition-colors">+00(88) 17456 51</a><br />
                    <a href="mailto:Support24@gmail.com" className="hover:text-primary transition-colors">Support24@gmail.com</a>
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Right - Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-card border border-border h-[400px]"
          >
            <iframe
              title="Our Location"
              src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
