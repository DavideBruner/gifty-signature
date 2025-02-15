"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    alert("Thank you for your message. We will get back to you soon!")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={fadeIn}>
        <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Textarea
          name="message"
          placeholder="Tell us about your gift idea"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div variants={fadeIn}>
        <Button type="submit" className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white">
          Send Request
        </Button>
      </motion.div>
    </motion.form>
  )
}

