"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { useProducts } from "@/modules/commerce/hooks/use-products";
import { categories } from "@/data/products";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

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

export default function ProductsPage() {
  const t = useTranslations("CollectionPage");

  const { products, loading, error } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (error) return <div>Error: {error.message}</div>;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimateWhenVisible variants={fadeInUp}>
        <h1 className="font-serif text-4xl text-brand-brown mb-8">
          {t("title")}
        </h1>
      </AnimateWhenVisible>

      {/* Category Navigation */}
      <AnimateWhenVisible variants={fadeInUp}>
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === null
                ? "bg-brand-brown text-white"
                : "bg-brand-pink text-brand-brown hover:bg-brand-brown hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? "bg-brand-brown text-white"
                  : "bg-brand-pink text-brand-brown hover:bg-brand-brown hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </AnimateWhenVisible>

      <AnimatePresence>
        <motion.div
          key={selectedCategory || "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/products/${product.id}`} className="group">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-brand-brown">
                      {product.name}
                    </h3>
                    <span className="text-lg font-semibold text-brand-brown">
                      from €{product.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-brand-brown-light text-sm">
                    {product.description}
                  </p>
                  <span className="inline-block bg-brand-pink px-3 py-1 rounded-full text-sm text-brand-brown">
                    {
                      categories.find((cat) => cat.id === product.categoryId)
                        ?.name
                    }
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
