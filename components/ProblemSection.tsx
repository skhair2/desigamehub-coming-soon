'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    icon: '😞',
    title: 'Video calls feel flat',
    description: 'The energy dies after hello. You miss the laughter.',
  },
  {
    icon: '📱',
    title: 'Games are too complicated',
    description: 'Downloads, updates, confusing rules. Who has time?',
  },
  {
    icon: '🌍',
    title: 'Distance kills the vibe',
    description: 'Family scattered across continents. Feels disconnected.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal-dark mb-4">
            Game night should not be this hard.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-card hover:shadow-medium transition-shadow"
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="font-heading font-semibold text-xl text-charcoal-dark mb-3">
                {problem.title}
              </h3>
              <p className="font-body text-charcoal-medium leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

