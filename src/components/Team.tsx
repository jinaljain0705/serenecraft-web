import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import teamNaomi from "@/assets/team-naomi.jpg";
import teamRobert from "@/assets/team-robert.jpg";
import teamSarah from "@/assets/team-sarah.jpg";
import teamJames from "@/assets/team-james.jpg";

const fallbackImages: Record<string, string> = {
  "Naomi Hannah": teamNaomi,
  "Dr. Robert Chen": teamRobert,
  "Sarah Williams": teamSarah,
  "James Parker": teamJames,
};

const Team = () => {
  const { data: team } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order").limit(3);
      if (error) throw error;
      return data;
    },
  });

  const gradients = ["bg-gradient-to-br from-mint to-peach/30", "bg-gradient-to-br from-peach/40 to-lemon", "bg-gradient-to-br from-lemon to-teal/20"];

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Explore The Team Instrumental<br />In Their Success
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {team?.map((m, i) => {
            const imgSrc = m.image_url || fallbackImages[m.name];
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className={`relative rounded-2xl overflow-hidden ${gradients[i % 3]} aspect-[4/5]`}>
                  {imgSrc && (
                    <img src={imgSrc} alt={m.name} className="w-full h-full object-cover mix-blend-multiply" loading="lazy" width={640} height={832} />
                  )}

                  {/* Social icons */}
                  <div className="absolute bottom-16 left-4 flex flex-col gap-2">
                    {[
                      { Icon: Facebook, url: m.social_facebook },
                      { Icon: Twitter, url: m.social_twitter },
                      { Icon: Linkedin, url: m.social_linkedin },
                      { Icon: Instagram, url: "#" },
                    ].map(({ Icon, url }, idx) => (
                      <a
                        key={idx}
                        href={url || "#"}
                        className="h-8 w-8 rounded-full bg-teal/80 flex items-center justify-center text-card hover:bg-teal transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
