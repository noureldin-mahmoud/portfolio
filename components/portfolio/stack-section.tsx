'use client'

import { motion } from 'motion/react'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { stackGroups, socials } from '@/lib/portfolio-data'

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail }

export function StackSection() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 py-28 sm:px-10 lg:px-16">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 text-foreground/10" />

      {/* Blue glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/20 dark:bg-blue-500/12 blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/18 dark:bg-indigo-500/10 blur-[110px]" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-400/15 dark:bg-blue-400/8 blur-[90px]" />
        {/* Corner deco */}
        <div className="absolute left-6 bottom-20 h-20 w-20 rounded-full border border-blue-400/25 dark:border-blue-400/15" />
        <div className="absolute right-10 top-16 h-28 w-28 rounded-2xl border border-primary/20 dark:border-primary/10 -rotate-12" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 bottom-32 h-14 w-14 rounded-full border border-blue-300/25 dark:border-blue-300/12"
        />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-12">
          <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="font-marker text-2xl text-primary sm:text-3xl">My</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-6xl leading-none tracking-tight sm:text-8xl">Tech Stack</motion.h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, boxShadow: '0 0 40px rgba(59,130,246,0.18)' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <motion.li key={item} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                    className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">{item}</motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Find me online</motion.h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {socials.map((s, i) => {
              const Icon = iconMap[s.icon]
              return (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  whileHover={{ y: -3 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-colors hover:border-primary">
                  <span className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-4" /></span>
                    <span className="flex flex-col"><span className="text-sm font-semibold">{s.label}</span><span className="max-w-[10rem] truncate text-xs text-muted-foreground">{s.handle}</span></span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
