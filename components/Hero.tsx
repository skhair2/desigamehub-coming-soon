'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal-dark via-charcoal-medium to-charcoal-dark">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-20" />
      
      {/* Floating decorative elements */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-saffron/20 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '0s' }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-purple/20 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-peacock/20 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '4s' }}
          />
          <motion.div
            className="absolute bottom-40 right-1/3 w-28 h-28 bg-gold/20 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          />
        </>
      )}

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream mb-6 leading-tight"
          >
            Play{' '}
            <span className="gradient-text bg-gradient-celebration bg-clip-text text-transparent">
              Tambola Online
            </span>
            <br />
            with Friends
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-heading text-xl sm:text-2xl md:text-3xl text-cream/90 mb-4 font-medium"
          >
            Party Games For Everyone
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-body text-lg sm:text-xl text-cream/80 mb-12 max-w-2xl mx-auto"
          >
            Play desi games online • Join tambola online lobby • Real-time desi games • Indian family party games online
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              'Real-time multiplayer desi games',
              'Local multiplayer desi games',
              'Cross-platform desi games',
              'Friends lobby games',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-card px-4 py-2 text-cream text-sm sm:text-base"
              >
                <span className="mr-2">✓</span>
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#waitlist"
              className="btn-primary text-lg px-8 py-4 min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="btn-secondary text-lg px-8 py-4 min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cream/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

