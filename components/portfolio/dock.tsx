'use client'

import { Home, Layers, FolderGit2, FileText, Mail, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'

export type SectionId = 'home' | 'stack' | 'projects'

type DockProps = {
  active: SectionId
  onNavigate: (id: SectionId) => void
  onOpenCv: () => void
  onOpenContact: () => void
  isDark: boolean
  onToggleTheme: () => void
}

const navItems: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'stack', label: 'Stack', icon: Layers },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
]

function DockButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`group relative grid size-11 place-items-center rounded-xl transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      {children}
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}

export function Dock({
  active,
  onNavigate,
  onOpenCv,
  onOpenContact,
  isDark,
  onToggleTheme,
}: DockProps) {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/80 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
        {navItems.map((item) => (
          <DockButton
            key={item.id}
            label={item.label}
            active={active === item.id}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="size-5" />
          </DockButton>
        ))}

        <DockButton label="Digital CV" onClick={onOpenCv}>
          <FileText className="size-5" />
        </DockButton>

        <span className="mx-1 h-7 w-px bg-border" />

        <DockButton label="Contact" onClick={onOpenContact}>
          <Mail className="size-5" />
        </DockButton>

        <DockButton
          label={isDark ? 'Light mode' : 'Dark mode'}
          onClick={onToggleTheme}
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </DockButton>
      </div>
    </motion.nav>
  )
}
