'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { socials } from '@/lib/portfolio-data'

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail }

const techStack = [
  { name: 'JavaScript', abbr: 'JS',  color: '#F7DF1E', textColor: '#000', bg: 'rgba(247,223,30,0.18)',  border: 'rgba(247,223,30,0.5)' },
  { name: 'Python',     abbr: 'PY',  color: '#3776AB', textColor: '#fff', bg: 'rgba(55,118,171,0.18)', border: 'rgba(55,118,171,0.5)' },
  { name: 'HTML5',      abbr: 'HT',  color: '#E34F26', textColor: '#fff', bg: 'rgba(227,79,38,0.18)',  border: 'rgba(227,79,38,0.5)' },
  { name: 'CSS3',       abbr: 'CS',  color: '#1572B6', textColor: '#fff', bg: 'rgba(21,114,182,0.18)', border: 'rgba(21,114,182,0.5)' },
  { name: 'Next.js',    abbr: 'NX',  color: '#ffffff', textColor: '#000', bg: 'rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.4)' },
  { name: 'SQL',        abbr: 'SQL', color: '#336791', textColor: '#fff', bg: 'rgba(51,103,145,0.18)', border: 'rgba(51,103,145,0.5)' },
  { name: 'Git',        abbr: 'GIT', color: '#F05032', textColor: '#fff', bg: 'rgba(240,80,50,0.18)',  border: 'rgba(240,80,50,0.5)' },
  { name: 'GitHub',     abbr: 'GH',  color: '#6e40c9', textColor: '#fff', bg: 'rgba(110,64,201,0.18)', border: 'rgba(110,64,201,0.5)' },
  { name: 'Database',   abbr: 'DB',  color: '#00C7B7', textColor: '#fff', bg: 'rgba(0,199,183,0.18)',  border: 'rgba(0,199,183,0.5)' },
]

export function StackSection() {
  const [active, setActive] = useState<string | null>(null)
  const activeTech = techStack.find(t => t.name === active)

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 py-28 sm:px-10 lg:px-16">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 text-foreground/10" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/20 dark:bg-blue-500/12 blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/15 dark:bg-indigo-500/10 blur-[110px]" />
        <div className="absolute left-6 bottom-20 h-20 w-20 rounded-full border border-blue-400/25" />
        <div className="absolute right-10 top-16 h-28 w-28 rounded-2xl border border-primary/20 -rotate-12" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 bottom-32 h-14 w-14 rounded-full border border-blue-300/25" />
      </div>

      {/* Social — right side */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        {socials.map((s) => {
          const Icon = iconMap[s.icon]
          return (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.2, x: -3 }}
              className="grid size-9 place-items-center rounded-xl border border-border bg-card/80 backdrop-blur text-muted-foreground shadow-sm hover:text-primary hover:border-primary transition-colors">
              <Icon className="size-4" />
            </motion.a>
          )
        })}
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10">
          <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="font-marker text-2xl text-primary italic sm:text-3xl">My Tech</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl leading-none tracking-tight sm:text-8xl">Stack</motion.h2>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-md">
          {techStack.map((tech, i) => {
            const isActive = active === tech.name
            return (
              <motion.button
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(isActive ? null : tech.name)}
                className="relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border aspect-square p-2 transition-all duration-300"
                style={isActive ? {
                  borderColor: tech.border,
                  backgroundColor: tech.bg,
                  boxShadow: `0 0 24px ${tech.color}50, 0 0 8px ${tech.color}30`,
                } : {
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--card)',
                }}
              >
                {/* Abbr text — gray when inactive, colored when active */}
                <span className="font-display text-lg font-black leading-none transition-all duration-300"
                  style={{ color: isActive ? tech.color : 'var(--muted-foreground)', filter: isActive ? 'none' : 'opacity(0.5)' }}>
                  {tech.abbr}
                </span>
                <span className="text-[8px] font-semibold uppercase tracking-wide leading-none transition-colors duration-300"
                  style={{ color: isActive ? tech.color : 'var(--muted-foreground)', opacity: isActive ? 0.9 : 0.5 }}>
                  {tech.name.split(' ')[0]}
                </span>
                {/* glow dot */}
                {isActive && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 size-2.5 rounded-full"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Active label */}
        <AnimatePresence mode="wait">
          {activeTech && (
            <motion.div key={activeTech.name}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="mt-5 flex items-center gap-2"
            >
              <span className="size-2.5 rounded-full" style={{ backgroundColor: activeTech.color, boxShadow: `0 0 8px ${activeTech.color}` }} />
              <span className="font-display text-2xl font-black" style={{ color: activeTech.color }}>{activeTech.name}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
