'use client'

import { useEffect, useState } from 'react'

export function LiveClock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Africa/Cairo',
        }).format(new Date()),
      )
    }
    update()
    const id = setInterval(update, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return <span suppressHydrationWarning>{time || '--:--'} Cairo</span>
}
