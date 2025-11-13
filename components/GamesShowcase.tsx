'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const games = [
  {
    icon: '🎲',
    title: 'Tambola (Housie)',
    seoTitle: 'Tambola Online Lobby - Play Online Housie Tambola',
    status: 'COMING SOON',
    statusColor: 'text-purple',
    description: 'The classic number game, now digital. Join tambola online lobby and play online housie tambola with friends.',
    features: [
      'Authentic digital tickets',
      'Auto-verification',
      'Multiple prize types',
      'Host tambola game or join tambola lobby',
    ],
    buttonText: 'Notify Me',
    buttonLink: '#waitlist',
    available: false,
    keywords: ['tambola online lobby', 'online housie tambola', 'host tambola game', 'join tambola lobby'],
  },
  {
    icon: '🎤',
    title: 'Desi Dumb Charades',
    seoTitle: 'Online Dumb Charades - Bollywood Game Night App',
    status: 'COMING SOON',
    statusColor: 'text-purple',
    description: 'Bollywood-themed charades with regional prompts. Perfect for your Bollywood game night app experience.',
    features: [
      '90s songs & movies',
      'Regional celebrities',
      'Team scoring',
      'Online dumb charades gameplay',
    ],
    buttonText: 'Notify Me',
    buttonLink: '#waitlist',
    available: false,
    keywords: ['online dumb charades', 'bollywood game night app'],
  },
  {
    icon: '🕵️',
    title: 'Desi Codenames',
    seoTitle: 'Desi CodeNames Game - Hindi Party Games App',
    status: 'COMING SOON',
    statusColor: 'text-purple',
    description: 'Strategic word-guessing with Desi themes. Experience the best Hindi party games app.',
    features: [
      'Word-guessing gameplay',
      'Indian themes',
      'Difficulty levels',
      'Desi CodeNames game experience',
    ],
    buttonText: 'Notify Me',
    buttonLink: '#waitlist',
    available: false,
    keywords: ['desi codenames game', 'hindi party games app'],
  },
]

export default function GamesShowcase() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentGameIndex((prev) => (prev + 1) % games.length)
    }, 4000) // Change game every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentGame = games[currentGameIndex]

  return (
    <section id="games" className="section-padding bg-gradient-to-br from-charcoal-dark to-charcoal-medium text-cream relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-saffron rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Classic Games, Elevated
          </h2>
          <p className="font-body text-lg text-cream/80 max-w-2xl mx-auto">
            Play desi games online with friends and family. Experience real-time desi games, local multiplayer desi games, and cross-platform desi games for NRIs and families worldwide.
          </p>
        </motion.div>

        {/* Animated Featured Game Showcase */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGameIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
            <div className="glass-card text-center p-8 md:p-12">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl mb-6"
              >
                {currentGame.icon}
              </motion.div>
              
              <h3 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                {currentGame.title}
              </h3>
              
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${currentGame.statusColor} bg-white/10`}>
                {currentGame.available ? '✅' : '🔜'} {currentGame.status}
              </div>
              
              <p className="font-body text-lg text-cream/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                {currentGame.description}
              </p>

              <motion.a
                href={currentGame.buttonLink}
                className={`inline-block px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all ${
                  currentGame.available
                    ? 'bg-saffron hover:bg-saffron-dark text-white shadow-saffron-glow'
                    : 'bg-white/10 hover:bg-white/20 text-cream border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentGame.buttonText}
              </motion.a>
            </div>
          </motion.div>
          </AnimatePresence>

          {/* Game Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {games.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentGameIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentGameIndex
                    ? 'bg-saffron w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View ${games[index].title}`}
              />
            ))}
          </div>
        </div>

        {/* All Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`glass-card hover:bg-white/20 transition-all cursor-pointer ${
                index === currentGameIndex ? 'ring-2 ring-saffron' : ''
              }`}
              onClick={() => {
                setCurrentGameIndex(index)
                setIsAutoPlaying(false)
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-5xl mb-4">{game.icon}</div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-heading font-semibold text-2xl">{game.title}</h3>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${game.statusColor} bg-white/10`}>
                {game.available ? '✅' : '🔜'} {game.status}
              </div>
              <p className="font-body text-cream/90 mb-6 leading-relaxed">
                {game.description}
              </p>
              <ul className="space-y-2 mb-6">
                {game.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="font-body text-cream/80 flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={game.buttonLink}
                className={`block text-center py-3 px-6 rounded-full font-heading font-semibold transition-all ${
                  game.available
                    ? 'bg-saffron hover:bg-saffron-dark text-white'
                    : 'bg-white/10 hover:bg-white/20 text-cream border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                {game.buttonText}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* SEO Keywords Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-body text-cream/70 text-sm">
            Play desi games online • Tambola online lobby • Online dumb charades • Desi CodeNames game • 
            Host tambola game • Join tambola lobby • Local multiplayer desi games • Indian family party games online • 
            Bollywood game night app • Real-time desi games • Friends lobby games • Online housie tambola • 
            Desi games for NRIs • Cross-platform desi games • Hindi party games app • Game Night • Desi Game Night • Diwali Game Night
          </p>
        </motion.div>
      </div>
    </section>
  )
}
