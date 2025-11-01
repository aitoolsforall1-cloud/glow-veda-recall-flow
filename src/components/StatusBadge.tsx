import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Active" | "In Progress" | "Closed" | "Open" | "Met" | "Delayed" | "At Risk";
  size?: "sm" | "md";
}

const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Active":
      case "Open":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "In Progress":
      case "Delayed":
        return "bg-warning/10 text-warning border-warning/20";
      case "Closed":
      case "Met":
        return "bg-success/10 text-success border-success/20";
      case "At Risk":
        return "bg-secondary/10 text-secondary border-secondary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Active":
      case "Open":
        return "🔴";
      case "In Progress":
      case "Delayed":
        return "🟡";
      case "Closed":
      case "Met":
        return "🟢";
      case "At Risk":
        return "🟠";
      default:
        return "⚪";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-smooth",
        getStatusStyles(),
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <span>{getStatusIcon()}</span>
      {status}
    </span>
  );
};

export default StatusBadge;
