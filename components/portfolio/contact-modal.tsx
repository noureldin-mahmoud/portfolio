'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, Github, Linkedin, Mail, Send, ArrowUpRight } from 'lucide-react'
import { socials, email, profile } from '@/lib/portfolio-data'

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail }

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'message' | 'connect'>('message')
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [body, setBody] = useState('')

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${name || 'someone'}`)
    const text = encodeURIComponent(
      `${body}\n\n— ${name}${from ? ` (${from})` : ''}`,
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${text}`
  }

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
            aria-label="Contact Me"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88svh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-border bg-card p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className="font-marker text-xl text-primary">Say hi</span>
                <h2 className="font-display text-3xl leading-none tracking-tight">
                  Contact Me
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
              {(['message', 'connect'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
                    tab === t
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground'
                  }`}
                >
                  {t === 'message' ? 'Message' : 'Connect'}
                </button>
              ))}
            </div>

            {tab === 'message' ? (
              <form onSubmit={sendMessage} className="flex flex-col gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  type="email"
                  placeholder="Your email"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={4}
                  placeholder="Write your message..."
                  className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Send className="size-4" />
                  Send message
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Opens your email app addressed to {profile.firstName}.
                </p>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {socials.map((s) => {
                  const Icon = iconMap[s.icon]
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-4 transition-colors hover:border-primary"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold">{s.label}</span>
                          <span className="max-w-[12rem] truncate text-xs text-muted-foreground">
                            {s.handle}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  )
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
