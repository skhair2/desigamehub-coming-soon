'use client'

import { motion } from 'framer-motion'

export default function SolutionSection() {
  return (
    <section id="solution" className="section-padding bg-gradient-primary text-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-peacock rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Meet DesiPlayground
          </h2>
          <p className="font-heading text-xl sm:text-2xl mb-8 text-cream/90">
            Same games. Modern tech. Zero friction.
          </p>
          <p className="font-body text-lg sm:text-xl leading-relaxed mb-12 text-cream/80">
            Play desi games online with all the classics you grew up with. Join tambola online lobby, play online dumb charades, 
            or try our Desi CodeNames game. All reimagined for the digital age.
            <br /><br />
            Host tambola game or join tambola lobby. Create a room. Share a code. Everyone joins instantly. 
            Experience real-time desi games with local multiplayer desi games and cross-platform desi games. 
            Perfect for Indian family party games online and friends lobby games.
            <br /><br />
            <span className="font-semibold">Your Bollywood game night app for Game Night, Desi Game Night, and Diwali Game Night. 
            Desi games for NRIs and families worldwide. Online housie tambola and Hindi party games app—all in one place.</span>
          </p>
          <motion.a
            href="#waitlist"
            className="btn-primary bg-white text-saffron hover:bg-cream inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Notify Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

