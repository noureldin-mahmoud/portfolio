'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Hero } from './hero'
import { StackSection } from './stack-section'
import { ProjectsSection } from './projects-section'
import { Dock, type SectionId } from './dock'
import { CvModal } from './cv-modal'
import { ContactModal } from './contact-modal'
import { Typewriter } from './typewriter'

const sectionNames: Record<SectionId, string> = {
  home: 'Home',
  stack: 'Stack',
  projects: 'Projects',
  cv: 'CV',
  contact: 'Contact',
}

function SectionOverlay({ name, onDone }: { name: string; onDone: () => void }) {
  const [typed, setTyped] = useState(false)

  useEffect(() => {
    // wait for typewriter to finish + a little extra
    const t = setTimeout(onDone, name.length * 80 + 900)
    return () => clearTimeout(t)
  }, [onDone, name])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* glass */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-2xl" />
      {/* blue ambient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
      {/* decorative rings */}
      <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
        className="absolute h-[400px] w-[400px] rounded-full border border-blue-400/20" />
      <motion.div animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity }}
        className="absolute h-[600px] w-[600px] rounded-full border border-primary/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-8"
      >
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="font-marker text-xl text-primary italic mb-2 opacity-70">
          you are in
        </motion.p>
        {/* Big name with marker font + typewriter */}
        <h2 className="font-marker text-[18vw] sm:text-[12rem] leading-none tracking-tight text-foreground"
          style={{ textShadow: '0 0 60px rgba(59,130,246,0.3)' }}>
          <Typewriter text={name} speed={80} onDone={() => setTyped(true)} />
        </h2>
        {typed && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }}
            className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
        )}
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
        <motion.div key={section}
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

      <AnimatePresence>
        {showOverlay && (
          <SectionOverlay name={overlayName} onDone={() => setShowOverlay(false)} />
        )}
      </AnimatePresence>

      <Dock active={section} onNavigate={navigate} onOpenCv={() => setCvOpen(true)} onOpenContact={() => setContactOpen(true)} isDark={isDark} onToggleTheme={toggleTheme} />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
