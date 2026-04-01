import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Team = () => {
  const { data: team } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
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
          {team?.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="aspect-[3/4] rounded-2xl bg-cream-dark mb-5 overflow-hidden shadow-soft group-hover:shadow-card transition-shadow">
                {m.image_url && (
                  <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-primary mb-3">{m.role}</p>
              <div className="flex justify-center gap-3">
                {[
                  { Icon: Facebook, url: m.social_facebook },
                  { Icon: Twitter, url: m.social_twitter },
                  { Icon: Linkedin, url: m.social_linkedin },
                ].map(({ Icon, url }, idx) => (
                  <a
                    key={idx}
                    href={url || "#"}
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
