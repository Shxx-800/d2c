"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Chart container
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
        "flex aspect-video justify-center text-xs",
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

// Simple tooltip component
const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm">
            <span className="font-medium">{item.name}:</span> {item.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
}