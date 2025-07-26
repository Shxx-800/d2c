import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "success" | "warning" | "destructive"
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, title, value, description, icon, trend, variant = "default", ...props }, ref) => {
    const getTrendIcon = (trendValue: number) => {
      if (trendValue > 0) return <TrendingUp className="h-3 w-3" />
      if (trendValue < 0) return <TrendingDown className="h-3 w-3" />
      return <Minus className="h-3 w-3" />
    }

    const getTrendColor = (trendValue: number) => {
      if (trendValue > 0) return "text-success"
      if (trendValue < 0) return "text-destructive"
      return "text-muted-foreground"
    }

    const getVariantStyles = () => {
      switch (variant) {
        case "success":
          return "border-success/20 bg-success/5"
        case "warning":
          return "border-warning/20 bg-warning/5"
        case "destructive":
          return "border-destructive/20 bg-destructive/5"
        default:
          return ""
      }
    }

    return (
      <Card 
        ref={ref} 
        className={cn(
          "card-modern hover:shadow-lg transition-all duration-300 group",
          getVariantStyles(),
          className
        )} 
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground mb-1">
            {value}
          </div>
          <div className="flex items-center justify-between">
            {description && (
              <p className="text-xs text-muted-foreground flex-1">
                {description}
              </p>
            )}
            {trend && (
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs font-medium",
                  getTrendColor(trend.value)
                )}
              >
                {getTrendIcon(trend.value)}
                <span className="ml-1">
                  {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
                </span>
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard }