"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ContactForm } from "@/components/ContactForm";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import CursorTrailEffect from "@/components/CursorTrail";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const slideIn = (direction: "left" | "right") => ({
  initial: { opacity: 0, x: direction === "left" ? -50 : 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
});

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimateWhenVisible({
  children,
  variants,
}: {
  children: React.ReactNode;
  variants: any;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="initial"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { products } = useProducts();
  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative h-[80vh] bg-brand-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-brand-pink bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            className="max-w-2xl"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl text-brand-brown mb-6"
            >
              Personalización y elegancia en cada detalle
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-brand-dark mb-8"
            >
              Transform every gift into a unique and elegant experience with our
              personalized arrangements
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="#contact"
                className="inline-block bg-brand-brown text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Create Your Perfect Gift
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimateWhenVisible variants={stagger}>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-4xl text-brand-brown mb-6"
              >
                Who We Are
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-brand-dark mb-4">
                GiftySignature was born with the purpose of transforming each
                gift into a unique and elegant experience. We create custom
                boxes, bouquets, and baskets, combining fresh flowers with
                carefully selected items chosen by our clients.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-brand-dark">
                Our goal is to provide a touch of class and attention to detail
                to celebrate special moments, making each gift an unforgettable
                memory.
              </motion.p>
            </AnimateWhenVisible>
            <AnimateWhenVisible variants={stagger}>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 gap-4"
              >
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Elegant gift arrangement"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Custom flower bouquet"
                  width={300}
                  height={300}
                  className="rounded-lg mt-8"
                />
              </motion.div>
            </AnimateWhenVisible>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateWhenVisible variants={fadeInUp}>
            <h2 className="font-serif text-4xl text-brand-brown text-center mb-12">
              What We Offer
            </h2>
          </AnimateWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateWhenVisible variants={slideIn("left")}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-brand-brown mb-4">
                  Custom Design
                </h3>
                <p className="text-brand-dark">
                  Each creation is designed to adapt to the client's needs,
                  choosing colors, styles, and details that are perfectly
                  coordinated.
                </p>
              </div>
            </AnimateWhenVisible>
            <AnimateWhenVisible variants={fadeInUp}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-brand-brown mb-4">
                  Refined Packaging
                </h3>
                <p className="text-brand-dark">
                  We use ribbons and accessories that harmonize with the chosen
                  product, creating an unforgettable unboxing experience.
                </p>
              </div>
            </AnimateWhenVisible>
            <AnimateWhenVisible variants={slideIn("right")}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-brand-brown mb-4">
                  Collaborations
                </h3>
                <p className="text-brand-dark">
                  We collaborate with various partners to bring unique and
                  exclusive products, ensuring a diverse and high-quality
                  selection for our customers.
                </p>
              </div>
            </AnimateWhenVisible>
          </div>
        </div>
      </section>

      {/* Our Creations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateWhenVisible variants={fadeInUp}>
            <h2 className="font-serif text-4xl text-brand-brown text-center mb-12">
              Our Creations
            </h2>
          </AnimateWhenVisible>
          <AnimateWhenVisible variants={stagger}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.slice(0, 6).map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className="aspect-square relative overflow-hidden rounded-lg"
                >
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-center font-serif text-xl">
                      {product.name}
                    </h3>
                  </div>
                  <CursorTrailEffect />
                </motion.div>
              ))}
            </div>
          </AnimateWhenVisible>
          <AnimateWhenVisible variants={fadeInUp}>
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-block bg-brand-pink text-brand-brown px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <AnimateWhenVisible variants={stagger}>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-4xl text-brand-brown mb-6"
              >
                Create Your Perfect Gift
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-brand-dark mb-8">
                Let us help you create a unique and personalized gift
                experience. Contact us to start designing your perfect
                arrangement.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-brand-dark mb-8">
                We speak multiple languages to serve you better: 🇬🇧 English, 🇪🇸
                Spanish, 🇮🇹 Italian
              </motion.p>
              <motion.div variants={fadeInUp}>
                <ContactForm />
              </motion.div>
            </AnimateWhenVisible>
          </div>
        </div>
      </section>
    </>
  );
}
