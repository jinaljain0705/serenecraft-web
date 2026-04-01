import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const bgColors = ["bg-muted", "bg-primary/20", "bg-accent/40", "bg-primary/20"];

const AboutTeam = () => {
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team-members-about"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  if (teamMembers.length === 0) return null;

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm"
            >
              <div className={`${bgColors[i % bgColors.length]} aspect-[4/5] overflow-hidden`}>
                {member.image_url ? (
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-6xl font-heading">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-5 bg-accent/30 text-center">
                <div className="flex justify-center gap-3 mb-3">
                  {[
                    { Icon: Facebook, url: member.social_facebook },
                    { Icon: Twitter, url: member.social_twitter },
                    { Icon: Linkedin, url: member.social_linkedin },
                    { Icon: Instagram, url: null },
                  ].map(({ Icon, url }, idx) => (
                    <a
                      key={idx}
                      href={url || "#"}
                      target={url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
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
};

export default AboutTeam;
