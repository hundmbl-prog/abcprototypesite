'use client'

import { useState } from 'react'
import { FilterChip } from '@/components/ui/FilterChip'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1']

export function FilterDemo() {
  const [selected, setSelected] = useState<string[]>(['B1'])
  const toggle = (level: string) =>
    setSelected((current) =>
      current.includes(level) ? current.filter((l) => l !== level) : [...current, level],
    )
  return (
    <div role="group" aria-label="Niveau filtern" className="flex flex-wrap gap-2">
      {levels.map((level) => (
        <FilterChip key={level} selected={selected.includes(level)} onClick={() => toggle(level)}>
          {level}
        </FilterChip>
      ))}
    </div>
  )
}
