import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const commands = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "View your analytics overview",
    path: "/dashboard",
    category: "Navigation",
    shortcut: "⌘D",
  },
  {
    id: "orders",
    title: "Orders",
    description: "Manage customer orders",
    path: "/orders",
    category: "Navigation",
    shortcut: "⌘O",
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "View customer reviews",
    path: "/feedback",
    category: "Navigation",
    shortcut: "⌘F",
  },
  {
    id: "auto-reply",
    title: "Auto-Reply",
    description: "Configure DM automation",
    path: "/auto-reply",
    category: "Navigation",
    shortcut: "⌘A",
  },
  {
    id: "export-orders",
    title: "Export Orders",
    description: "Download orders as CSV",
    action: "export-orders",
    category: "Actions",
  },
  {
    id: "add-order",
    title: "Add New Order",
    description: "Create a new order entry",
    action: "add-order",
    category: "Actions",
  },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [search, setSearch] = React.useState("")

  const filteredCommands = commands.filter((command) =>
    command.title.toLowerCase().includes(search.toLowerCase()) ||
    command.description.toLowerCase().includes(search.toLowerCase())
  )

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, typeof commands>)

  const handleSelect = (command: typeof commands[0]) => {
    if (command.path) {
      navigate(command.path)
    } else if (command.action) {
      // Handle actions here
      console.log("Action:", command.action)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg max-w-2xl">
        <CommandPrimitive className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
            />
            <Badge variant="secondary" className="ml-2 text-xs">
              ⌘K
            </Badge>
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandPrimitive.Empty className="py-6 text-center text-sm">
              No results found.
            </CommandPrimitive.Empty>
            {Object.entries(groupedCommands).map(([category, commands]) => (
              <CommandPrimitive.Group key={category} heading={category}>
                {commands.map((command) => (
                  <CommandPrimitive.Item
                    key={command.id}
                    value={command.title}
                    onSelect={() => handleSelect(command)}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{command.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {command.description}
                      </div>
                    </div>
                    {command.shortcut && (
                      <Badge variant="outline" className="text-xs">
                        {command.shortcut}
                      </Badge>
                    )}
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}