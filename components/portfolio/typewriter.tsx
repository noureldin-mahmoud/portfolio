'use client'

import { useEffect, useState } from 'react'

type TypewriterProps = {
  text: string
  /** ms before this line starts typing */
  startDelay?: number
  /** ms per character */
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
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [started, count, text.length, speed, onDone])

  const done = count >= text.length

  return (
    <span className={className}>
      {text.slice(0, count)}
      {(!done || showCaretWhenDone) && (
        <span className="animate-caret ml-0.5 inline-block translate-y-[0.05em] text-primary">
          |
        </span>
      )}
    </span>
  )
}
