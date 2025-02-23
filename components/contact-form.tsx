"use client";

import { toast } from "sonner";
import { FormEventHandler, SyntheticEvent, use, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { celebrate } from "@/lib/party";
import { useTranslations } from "next-intl";
import useEmail from "@/hooks/use-email";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendEmail } = useEmail();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await sendEmail({
        ...formData,
        type: "info_email",
      });
      if (data?.success) {
        celebrate();
        toast.success(t("success"));
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(data?.error);
      }
      // Here you would typically send the form data to your backend
    } catch (error) {
      toast.success(t("error"));
      console.error("Failed to submit order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={fadeIn}>
        <Input
          type="text"
          name="name"
          placeholder={t("name")}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Input
          type="email"
          name="email"
          placeholder={t("email")}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Input
          type="tel"
          name="phone"
          placeholder={t("phone")}
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Textarea
          name="message"
          placeholder={t("message")}
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
        >
          {t("submit")}
        </Button>
      </motion.div>
    </motion.form>
  );
}
