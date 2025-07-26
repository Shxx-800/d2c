"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Enhanced Chart container with better styling
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: Record<string, any>
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs [&_.recharts-surface]:rounded-lg [&_.recharts-cartesian-grid-horizontal_line]:stroke-muted [&_.recharts-cartesian-grid-vertical_line]:stroke-muted",
        className
      )}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer>
        {children as React.ReactElement}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "Chart"

// Enhanced tooltip component with better styling
const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-background/95 backdrop-blur-sm p-3 shadow-lg ring-1 ring-border/50">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium">{item.name}:</span> 
            <span className="font-semibold">{item.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Enhanced Legend component
const ChartLegend = ({ payload }: any) => {
  if (!payload?.length) return null
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-muted-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
}