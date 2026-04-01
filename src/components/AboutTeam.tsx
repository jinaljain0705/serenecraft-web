import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const teamMembers = [
  {
    name: "Naomi Hannah",
    role: "Senior Care Doctor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    bg: "bg-muted",
  },
  {
    name: "Ruby Sophie",
    role: "Community Care Expert",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
    bg: "bg-primary/20",
  },
  {
    name: "Genesis Josephine",
    role: "Emotional Counselor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
    bg: "bg-accent/40",
  },
  {
    name: "David Carter",
    role: "Personal Care Doctor",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop",
    bg: "bg-primary/20",
  },
];

const AboutTeam = () => (
  <section className="py-24 bg-secondary/50">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full border-2 border-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our Experts</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Explore The Team Instrumental<br />In Their Success
          </h2>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden md:flex h-16 w-16 rounded-full bg-primary items-center justify-center cursor-pointer shrink-0"
        >
          <span className="text-primary-foreground font-semibold text-sm">More</span>
        </motion.div>
      </div>

      {/* Team grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden shadow-sm"
          >
            <div className={`${member.bg} aspect-[4/5] overflow-hidden`}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 bg-accent/30 text-center">
              <div className="flex justify-center gap-3 mb-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <span key={idx} className="h-8 w-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                ))}
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeam;
