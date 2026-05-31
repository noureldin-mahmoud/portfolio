'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  X,
  User,
  GraduationCap,
  Layers,
  TrendingUp,
  FolderGit2,
} from 'lucide-react'
import { cv, profile, stackGroups } from '@/lib/portfolio-data'

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof User
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-border py-6 first:border-t-0 first:pt-0">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        <Icon className="size-4 text-primary" />
        {title}
      </h3>
      {children}
    </div>
  )
}

export function CvModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Digital CV"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88svh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="font-marker text-xl text-primary">Fast Report</span>
                <h2 className="font-display text-3xl leading-none tracking-tight">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <Section icon={User} title="Overview">
              <p className="text-pretty text-sm leading-relaxed text-foreground/80">
                {cv.overview}
              </p>
            </Section>

            <Section icon={GraduationCap} title="Academic">
              <p className="text-sm font-semibold">{cv.academic.program}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {cv.academic.institutions.map((inst) => (
                  <li key={inst}>• {inst}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs font-medium text-primary">
                {cv.academic.timeline}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cv.academic.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Section>

            <Section icon={Layers} title="Stack">
              <div className="flex flex-wrap gap-2">
                {stackGroups
                  .flatMap((g) => g.items)
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </Section>

            <Section icon={FolderGit2} title="Projects">
              <p className="font-display text-3xl tracking-tight text-foreground/80">
                SOON
              </p>
            </Section>

            <Section icon={TrendingUp} title="Impact">
              <p className="font-display text-3xl tracking-tight text-foreground/80">
                SOON
              </p>
            </Section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
