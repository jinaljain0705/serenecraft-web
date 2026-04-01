import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const team = [
  { name: "Naomi Hannah", role: "Senior Care Doctor", socials: true },
  { name: "Dr. Robert Chen", role: "Chief Medical Officer", socials: true },
  { name: "Sarah Williams", role: "Head Nurse", socials: true },
  { name: "James Parker", role: "Physiotherapist", socials: true },
];

const Team = () => (
  <section id="team" className="py-24">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">Our Team</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Meet Our <span className="text-gradient-teal">Experts</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Dedicated professionals committed to providing the highest quality care.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group text-center"
          >
            <div className="aspect-[3/4] rounded-2xl bg-cream-dark mb-5 overflow-hidden shadow-soft group-hover:shadow-card transition-shadow" />
            <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
            <p className="text-sm text-primary mb-3">{m.role}</p>
            {m.socials && (
              <div className="flex justify-center gap-3">
                {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                  <a key={idx} href="#" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
