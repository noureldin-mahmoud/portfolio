'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { MapPin, Clock } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { Typewriter } from './typewriter'
import { LiveClock } from './live-clock'

export function Hero({ onContact }: { onContact: () => void }) {
  const [showName, setShowName] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 py-24 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 text-foreground/10" />
        <div className="hero-glow absolute inset-0" />
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 dark:bg-blue-500/15 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-400/15 dark:bg-blue-400/10 blur-[110px]" />
        <div className="absolute left-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-indigo-500/12 dark:bg-indigo-500/8 blur-[100px]" />
        <div className="absolute left-8 top-32 h-24 w-24 rounded-full border border-blue-400/20" />
        <div className="absolute left-16 top-40 h-12 w-12 rounded-full border border-blue-400/15" />
        <div className="absolute bottom-32 right-12 h-32 w-32 rounded-2xl border border-primary/15 rotate-12" />
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-blue-400/50 dark:bg-blue-400/35"
            style={{ width: i % 2 === 0 ? '5px' : '3px', height: i % 2 === 0 ? '5px' : '3px', left: `${8 + i * 11}%`, top: `${15 + (i % 4) * 20}%`, boxShadow: '0 0 8px rgba(99,179,237,0.6)' }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col">
          {/* "The Portfolio of" handwriting italic */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-marker text-3xl text-primary italic sm:text-4xl"
          >
            <Typewriter text={profile.preName} speed={60} onDone={() => setShowName(true)} />
          </motion.span>

          <h1 className="mt-2 font-display leading-[0.86] tracking-tight">
            {/* NOUR — straight, no skew */}
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={showName ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[20vw] sm:text-[15vw] lg:text-[11rem]"
              onAnimationComplete={() => setShowTagline(true)}
            >
              {profile.firstName}
            </motion.span>
            {/* ELDIN — blue, straight */}
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={showName ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[20vw] text-primary sm:text-[15vw] lg:text-[11rem]"
            >
              {profile.lastName}
            </motion.span>
          </h1>

          {/* Tagline handwriting italic */}
          <span className="mt-1 font-marker text-2xl italic text-foreground/70 sm:text-3xl">
            {showTagline && <Typewriter text={profile.tagline} speed={45} showCaretWhenDone />}
          </span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
              <span className="size-2 rounded-full bg-amber-500" />{profile.availabilityNote}
            </motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
              <Clock className="size-3.5 text-muted-foreground" /><LiveClock />
            </motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
              <MapPin className="size-3.5 text-primary" />{profile.location} {profile.locationFlag}
            </motion.span>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: showName ? 1 : 0, scale: showName ? 1 : 0.85, y: showName ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-[3/4] w-full max-w-xs items-center justify-center lg:flex"
        >
          <div className="absolute inset-0 rounded-3xl bg-blue-500/25 dark:bg-blue-500/20 blur-3xl" />
          <div className="animate-floaty-rev absolute inset-4 rounded-3xl border border-primary/30 bg-primary/5 backdrop-blur-sm" />
          <div className="animate-floaty absolute -inset-2 rounded-[1.75rem] border border-foreground/10 bg-card/30 backdrop-blur-md" />
          <div className="animate-floaty relative h-full w-full overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl shadow-blue-500/25">
            <Image src={profile.photo || '/placeholder.svg'} alt={`${profile.firstName} ${profile.lastName}`} fill priority sizes="(max-width: 1024px) 0px, 320px" className="object-cover object-top" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-shimmer absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContact}
        className="absolute bottom-28 right-5 z-20 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-md sm:right-10"
      >
        👋 Contact
      </motion.button>
    </section>
  )
}
