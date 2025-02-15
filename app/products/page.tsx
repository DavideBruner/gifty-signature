"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { useProducts } from "@/hooks/useProducts"
import { useEffect, useRef } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function AnimateWhenVisible({ children, variants }: { children: React.ReactNode; variants: any }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("animate")
    }
  }, [controls, inView])

  return (
    <motion.div ref={ref} animate={controls} initial="initial" variants={variants}>
      {children}
    </motion.div>
  )
}

export default function ProductsPage() {
  const { products, loading, error } = useProducts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimateWhenVisible variants={fadeInUp}>
        <h1 className="font-serif text-4xl text-brand-brown mb-8">Our Collections</h1>
      </AnimateWhenVisible>
      <AnimateWhenVisible variants={stagger}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <Link href={`/products/${product.id}`} className="group">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif text-xl text-brand-brown mb-2">{product.name}</h3>
                <p className="text-brand-dark mb-2">{product.description}</p>
                <p className="text-lg font-semibold text-brand-brown">From €{product.price.toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimateWhenVisible>
    </div>
  )
}

