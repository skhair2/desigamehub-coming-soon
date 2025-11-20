'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Is DesiPlayground completely free?',
    answer:
      'Yes! All games on DesiPlayground are 100% free to play. We offer optional cosmetic purchases and premium features, but all core gameplay is completely free and accessible to everyone.',
  },
  {
    question: 'Can I play on mobile devices?',
    answer:
      'Absolutely! DesiPlayground is fully responsive and optimized for all devices – smartphones, tablets, and desktop computers. Experience the same smooth gameplay on any device.',
  },
  {
    question: 'Can I play against my friends?',
    answer:
      'Yes! Invite friends via a unique game code, or join multiplayer lobbies to find opponents in real-time. Our instant matchmaking ensures you find players quickly.',
  },
  {
    question: 'Is my data secure on DesiPlayground?',
    answer:
      'Yes. We use HTTPS encryption, industry-standard security protocols, and never share your personal data with third parties. Your privacy and security are our top priority.',
  },
  {
    question: 'How do I host a game?',
    answer:
      'Sign up for free, select a game from our library, and create a new lobby. Share the game code with friends to invite them directly to your game.',
  },
  {
    question: 'What games are available?',
    answer:
      'We offer classic Desi games including Ludo, Tambola/Housie, Dumb Charades, Codenames, Carrom, and more. New games are added regularly based on community feedback.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'Creating an account is optional for guest play, but we recommend signing up to track your stats, unlock achievements, and participate in tournaments.',
  },
  {
    question: 'Are there tournaments with prizes?',
    answer:
      'Yes! We host weekly and monthly tournaments with exciting prize pools. Join tournaments of varying difficulty levels to compete with players worldwide.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="faq"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal-dark via-charcoal-medium to-charcoal-dark"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-saffron to-gold rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-peacock to-purple rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about DesiPlayground. Have more questions? Reach out to our support team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="px-6 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 text-saffron"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-white/5 border-t border-white/10 text-gray-300">
                    {item.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <a
            href="mailto:support@DesiPlayground.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-saffron/50 transition-all"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
