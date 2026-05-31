'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { socials } from '@/lib/portfolio-data'

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail }

const techIcons = [
  { name: 'HTML5',      icon: '🌐', color: '#E34F26', bg: 'rgba(227,79,38,0.15)' },
  { name: 'CSS3',       icon: '🎨', color: '#1572B6', bg: 'rgba(21,114,182,0.15)' },
  { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', bg: 'rgba(247,223,30,0.15)' },
  { name: 'Python',     icon: '🐍', color: '#3776AB', bg: 'rgba(55,118,171,0.15)' },
  { name: 'SQL',        icon: '🗄️', color: '#336791', bg: 'rgba(51,103,145,0.15)' },
  { name: 'Git',        icon: '🔀', color: '#F05032', bg: 'rgba(240,80,50,0.15)' },
  { name: 'GitHub',     icon: '🐙', color: '#ffffff', bg: 'rgba(255,255,255,0.1)' },
  { name: 'Next.js',    icon: '▲',  color: '#ffffff', bg: 'rgba(255,255,255,0.1)' },
  { name: 'Database',   icon: '💾', color: '#00C7B7', bg: 'rgba(0,199,183,0.15)' },
]

export function StackSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 py-28 sm:px-10 lg:px-16">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 text-foreground/10" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/20 dark:bg-blue-500/12 blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/18 dark:bg-indigo-500/10 blur-[110px]" />
        <div className="absolute left-6 bottom-20 h-20 w-20 rounded-full border border-blue-400/25 dark:border-blue-400/15" />
        <div className="absolute right-10 top-16 h-28 w-28 rounded-2xl border border-primary/20 dark:border-primary/10 -rotate-12" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 bottom-32 h-14 w-14 rounded-full border border-blue-300/25 dark:border-blue-300/12" />
      </div>

      {/* Social links — right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10">
        {socials.map((s) => {
          const Icon = iconMap[s.icon]
          return (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.2, x: -4 }}
              className="grid size-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-primary hover:border-primary">
              <Icon className="size-4" />
            </motion.a>
          )
        })}
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-12">
          <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="font-marker text-2xl text-primary italic sm:text-3xl">My Tech</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl leading-none tracking-tight sm:text-8xl">Stack</motion.h2>
        </header>

        {/* Icons grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-w-lg">
          {techIcons.map((tech, i) => (
            <motion.button
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(active === tech.name ? null : tech.name)}
              style={active === tech.name ? {
                borderColor: tech.color,
                backgroundColor: tech.bg,
                boxShadow: `0 0 20px ${tech.color}40`,
              } : {}}
              className="relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-card p-3 transition-all duration-300 aspect-square"
            >
              <span className="text-2xl" style={active === tech.name ? { filter: 'none' } : { filter: 'grayscale(1) opacity(0.6)' }}>
                {tech.icon}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground leading-none">
                {tech.name.split(' ')[0]}
              </span>
              {active === tech.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-1 -right-1 size-2.5 rounded-full"
                  style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Active tech name */}
        {active && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm font-medium text-muted-foreground">
            Selected: <span className="text-foreground font-bold">{active}</span>
          </motion.p>
        )}
      </div>
    </section>
  )
}
