'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Hero } from './hero'
import { StackSection } from './stack-section'
import { ProjectsSection } from './projects-section'
import { Dock, type SectionId } from './dock'
import { CvModal } from './cv-modal'
import { ContactModal } from './contact-modal'

export function Portfolio() {
  const [section, setSection] = useState<SectionId>('home')
  const [cvOpen, setCvOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // initialise theme from system / storage
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
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
