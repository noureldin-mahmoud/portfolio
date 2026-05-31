'use client'

import { AnimatePresence, motion } from 'motion/react'
import { X, Mail, MapPin, Linkedin, Github } from 'lucide-react'
import { cv, profile, stackGroups, socials } from '@/lib/portfolio-data'

export function CvModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const allSkills = stackGroups.flatMap((g) => g.items)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-3xl"
          >
            {/* Header bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📄</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Fast Report</span>
              </div>
              <button onClick={onClose} className="grid size-8 place-items-center rounded-full border border-gray-200 dark:border-zinc-700 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-0">
              {/* Left column */}
              <div className="p-6 sm:p-8 sm:border-r border-gray-100 dark:border-zinc-800">
                {/* Name */}
                <h2 className="font-display text-4xl sm:text-5xl font-black leading-none tracking-tight">
                  <span className="text-foreground dark:text-white">{profile.firstName} </span>
                  <span className="text-blue-500">{profile.lastName}</span>
                </h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                  Full-Stack Engineer & Tech Entrepreneur
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Mail className="size-3" /> noureldeen.mahmoud.fathy@gmail.com</span>
                  <span className="flex items-center gap-1"><MapPin className="size-3" /> Giza, Egypt</span>
                </div>

                {/* Overview */}
                <div className="mt-6">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-500">Overview</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{cv.overview}</p>
                </div>

                {/* Projects */}
                <div className="mt-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-500">Projects</h3>
                  <p className="font-display text-4xl font-black tracking-tight text-gray-200 dark:text-zinc-700">SOON</p>
                </div>

                {/* Academic */}
                <div className="mt-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-500">Academic Background</h3>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{cv.academic.program}</p>
                  {cv.academic.institutions.map((inst) => (
                    <p key={inst} className="text-sm text-gray-500 dark:text-gray-400">{inst}</p>
                  ))}
                  <p className="mt-1 inline-block rounded bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-semibold text-blue-500">{cv.academic.timeline}</p>
                </div>

                {/* Languages */}
                <div className="mt-8 flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>English (Prof.)</span>
                  <span>Arabic (Native)</span>
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-300 dark:text-zinc-600">
                  Built with passion & Next.js · © 2026 Noureldin Mahmoud
                </p>
              </div>

              {/* Right column */}
              <div className="p-6 space-y-6">
                {/* Stack */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-500">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <span key={skill} className="rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-500">Impact</h3>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    <p>Dual-degree student at <strong>CIC & CBU</strong>.</p>
                    <p>Aspiring <strong>Tech Entrepreneur</strong>.</p>
                    <p>Building <strong>scalable digital products</strong>.</p>
                  </div>
                </div>

                {/* Connect */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-500">Connect</h3>
                  <div className="space-y-3">
                    <a href="https://www.linkedin.com/in/noureldin-mahmoud-422612389/" target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                      <Linkedin className="size-4 text-gray-400" /> LinkedIn
                    </a>
                    <a href="https://github.com/noureldin-mahmoud" target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                      <Github className="size-4 text-gray-400" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
