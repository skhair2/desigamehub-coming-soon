'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    icon: '🎲',
    title: 'Create a Room',
    description: 'Pick Tambola, set players, get your code.',
    image: '📱',
  },
  {
    icon: '📤',
    title: 'Share the Code',
    description: 'Send via WhatsApp, SMS, or just read it out loud.',
    image: '💬',
  },
  {
    icon: '🎉',
    title: 'Play & Celebrate',
    description: 'Play live, chat with friends, and win together.',
    image: '🏆',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal-dark mb-4">
            Getting Started Takes 30 Seconds
          </h2>
          <p className="font-body text-lg text-charcoal-medium max-w-2xl mx-auto">
            No complicated setup. No downloads. Just instant fun.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="text-6xl mb-4">{step.icon}</div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-primary transform translate-x-1/2" />
                )}
              </div>
              <h3 className="font-heading font-semibold text-2xl text-charcoal-dark mb-3">
                {step.title}
              </h3>
              <p className="font-body text-charcoal-medium leading-relaxed">
                {step.description}
              </p>
              <div className="mt-4 text-4xl opacity-50">{step.image}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

