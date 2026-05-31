'use client'

import { useEffect, useState } from 'react'

type TypewriterProps = {
  text: string
  startDelay?: number
  speed?: number
  className?: string
  showCaretWhenDone?: boolean
  onDone?: () => void
}

export function Typewriter({
  text,
  startDelay = 0,
  speed = 55,
  className,
  showCaretWhenDone = false,
  onDone,
}: TypewriterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const [glowIdx, setGlowIdx] = useState(-1)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (count >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => {
      setCount((c) => c + 1)
      setGlowIdx(count)
      setTimeout(() => setGlowIdx(-1), 350)
    }, speed)
    return () => clearTimeout(t)
  }, [started, count, text.length, speed, onDone])

  const done = count >= text.length

  return (
    <span className={className}>
      {text.slice(0, count).split('').map((char, i) => (
        <span
          key={i}
          className="relative inline-block transition-all duration-300"
          style={{
            textShadow: i === glowIdx
              ? '0 0 20px rgba(99,179,237,0.9), 0 0 40px rgba(99,179,237,0.6), 0 0 60px rgba(99,179,237,0.3)'
              : i >= count - 3
              ? '0 0 10px rgba(99,179,237,0.4)'
              : 'none',
            opacity: i === glowIdx ? 1 : i >= count - 2 ? 0.85 : 1,
            transform: i === glowIdx ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
            display: 'inline-block',
            transition: 'transform 0.2s, text-shadow 0.3s',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {(!done || showCaretWhenDone) && (
        <span
          className="animate-caret ml-0.5 inline-block translate-y-[0.05em]"
          style={{
            color: 'var(--primary)',
            textShadow: '0 0 15px rgba(99,179,237,0.8), 0 0 30px rgba(99,179,237,0.4)',
          }}
        >
          |
        </span>
      )}
    </span>
  )
}
