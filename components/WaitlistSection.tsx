'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function WaitlistSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name || undefined,
          source: 'coming-soon-page',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      toast.success('Great! You are on the waitlist. We will get back to you soon.')
      setFormData({ name: '', email: '' })
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="waitlist" className="section-padding bg-gradient-celebration text-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Be First to Play
          </h2>
          <p className="font-heading text-xl sm:text-2xl mb-4 text-cream/90">
            Join the waitlist and get early access + exclusive bonuses
          </p>
          <p className="font-body text-lg mb-12 text-cream/80">
            Get notified when we launch and receive special perks for being an early supporter.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card space-y-4"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name (optional)"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-cream placeholder-cream/60 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-cream placeholder-cream/60 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.email}
              className="btn-primary w-full bg-white text-saffron hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? 'Subscribing...' : 'Get Early Access'}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 space-y-3"
          >
            <p className="font-heading font-semibold text-lg mb-4">Early Access Bonuses:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                'First game free',
                'Referral bonus (+10% per friend)',
                'Early access to new games',
                'Priority support',
              ].map((bonus) => (
                <div key={bonus} className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span className="font-body text-cream/90">{bonus}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

