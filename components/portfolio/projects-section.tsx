'use client'

import { motion } from 'motion/react'
import { Search, Rocket } from 'lucide-react'
import { projects } from '@/lib/portfolio-data'

export function ProjectsSection() {
  const empty = projects.length === 0

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 py-28 sm:px-10 lg:px-16">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 text-foreground/10" />

      {/* Blue ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[110px]" />
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-400/6 blur-[90px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-marker text-2xl text-primary sm:text-3xl"
          >
            Selected
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl leading-none tracking-tight sm:text-8xl"
          >
            Projects
          </motion.h2>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-muted-foreground shadow-sm"
        >
          <Search className="size-4" />
          <span className="text-sm">Search projects by title, tags, or contributor...</span>
        </motion.div>

        {empty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 grid place-items-center overflow-hidden rounded-3xl border border-border bg-card py-20"
          >
            <div className="bg-dots pointer-events-none absolute inset-0 text-foreground/5" />
            {/* Blue glow inside card */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-blue-500/5" />
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Rocket className="mb-4 size-10 text-primary" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-display text-7xl tracking-tight text-foreground sm:text-9xl"
            >
              SOON
            </motion.p>
            <p className="mt-3 max-w-sm text-pretty text-center text-sm text-muted-foreground">
              Currently building. Selected projects will land here very soon —
              stay tuned.
            </p>
          </motion.div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary"
              >
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
