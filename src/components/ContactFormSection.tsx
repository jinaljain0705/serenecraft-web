import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type FormData = z.infer<typeof schema>;

const ContactFormSection = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("contact_submissions").insert([{
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      service: "General Inquiry",
      message: data.message,
    }]);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    reset();
  };

  const inputClass = "w-full rounded-lg border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left - Title & description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              To Speak To Our Friendly Team, Please Contact
            </h2>
            <p className="text-muted-foreground">
              Drop us a line and we will ensure the appropriate team responds to your enquiry.
            </p>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 rounded-2xl bg-card p-8 sm:p-10 shadow-card border border-border space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input {...register("firstName")} id="firstName" placeholder="First Name" className={inputClass} />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input {...register("lastName")} id="lastName" placeholder="Last Name" className={inputClass} />
                {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input {...register("phone")} id="phone" placeholder="Your Phone" className={inputClass} />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input {...register("email")} id="email" placeholder="Your Email" className={inputClass} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea {...register("message")} id="message" placeholder="Write Message . . . ." rows={5} className={inputClass} />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
