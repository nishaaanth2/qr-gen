"use client"

import * as React from "react"
import { SliderProps } from "@radix-ui/react-slider"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface AttributeSelectorProps {
  defaultValue: SliderProps["defaultValue"]
  maxValue: number
  label: string
  hoverText: string
  allowMore?: boolean
  onChange?: (value: number[]) => void
}

export function AttributeSelector({
  defaultValue,
  maxValue,
  label,
  hoverText,
  allowMore = false,
  onChange,
}: AttributeSelectorProps) {
  const [value, setValue] = React.useState(defaultValue)

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (newValue === '') {
      handleValueChange([0])
    } else {
      const parsedValue = parseFloat(newValue)
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        if (allowMore || parsedValue <= maxValue) {
          handleValueChange([parsedValue])
        }
      }
    }
  }

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor={label.toLowerCase()}>{label}</Label>
              <Input
                type="text"
                className="w-28 text-right"
                value={value?.[0].toString() || '0'}
                onChange={handleInputChange}
                suffix="px"
              />
            </div>
            <Slider
              id={label.toLowerCase()}
              max={maxValue}
              value={value}
              step={1}
              onValueChange={handleValueChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label={label}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          {hoverText}
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}