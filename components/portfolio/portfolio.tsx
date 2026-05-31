'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Hero } from './hero'
import { StackSection } from './stack-section'
import { ProjectsSection } from './projects-section'
import { Dock, type SectionId } from './dock'
import { CvModal } from './cv-modal'
import { ContactModal } from './contact-modal'

const sectionNames: Record<SectionId, string> = {
  home: 'Home',
  stack: 'Stack',
  projects: 'Projects',
  cv: 'CV',
  contact: 'Contact',
}

function SectionOverlay({ name, onDone }: { name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass backdrop */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-xl" />
      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/8" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-marker text-lg text-primary italic mb-1"
        >
          You are in
        </motion.p>
        <motion.h2
          className="font-display text-[15vw] sm:text-[10rem] leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h2>
      </motion.div>
    </motion.div>
  )
}

export function Portfolio() {
  const [section, setSection] = useState<SectionId>('home')
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayName, setOverlayName] = useState('Home')
  const [cvOpen, setCvOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
    // Show intro overlay on first load
    setOverlayName('Home')
    setShowOverlay(true)
  }, [])

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  function navigate(id: SectionId) {
    setSection(id)
    setOverlayName(sectionNames[id])
    setShowOverlay(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="relative min-h-svh w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {section === 'home' && <Hero onContact={() => setContactOpen(true)} />}
          {section === 'stack' && <StackSection />}
          {section === 'projects' && <ProjectsSection />}
        </motion.div>
      </AnimatePresence>

      {/* Section intro overlay */}
      <AnimatePresence>
        {showOverlay && (
          <SectionOverlay name={overlayName} onDone={() => setShowOverlay(false)} />
        )}
      </AnimatePresence>

      <Dock
        active={section}
        onNavigate={navigate}
        onOpenCv={() => setCvOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
