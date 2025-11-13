'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚡',
    title: 'Real-Time Multiplayer Desi Games',
    description: 'Play desi games online with real-time updates, zero lag, synchronized gameplay. Perfect for friends lobby games.',
  },
  {
    icon: '🎮',
    title: 'Authentic Desi Games',
    description: 'Tambola online lobby, online dumb charades, Desi CodeNames game—all your favorite Indian family party games online.',
  },
  {
    icon: '📱',
    title: 'Cross-Platform Desi Games',
    description: 'Phone, tablet, laptop. No downloads. Works everywhere for local multiplayer desi games.',
  },
  {
    icon: '🔒',
    title: 'Safe & Fair',
    description: 'Automatic verification. No cheating. No arguments. Trusted by families worldwide.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Desi Games for NRIs',
    description: 'Perfect for NRIs connecting with family back home. Indian family party games online for all ages.',
  },
  {
    icon: '🌍',
    title: 'Bollywood Game Night App',
    description: 'Host tambola game or join tambola lobby. Online housie tambola and Hindi party games app for Game Night, Desi Game Night, and Diwali Game Night.',
  },
]

export default function FeaturesShowcase() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal-dark mb-4">
            Everything You Need for Desi Game Night
          </h2>
          <p className="font-body text-lg text-charcoal-medium max-w-3xl mx-auto">
            Perfect for Diwali Game Night, weekend Game Night, or any time you want to play desi games online with friends and family. 
            Experience the best Indian family party games online with our Bollywood game night app.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-cream rounded-xl p-6 shadow-card hover:shadow-medium transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-heading font-semibold text-xl text-charcoal-dark mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-charcoal-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

