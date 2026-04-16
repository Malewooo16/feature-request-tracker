import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { FeatureRequest, Status, Priority } from "../types";

interface FeatureCardProps {
  request: FeatureRequest;
  onEdit: (request: FeatureRequest) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
}

const priorityVariants: Record<Priority, "low" | "medium" | "high"> = {
  "Low": "low",
  "Medium": "medium",
  "High": "high",
};

const statusStyles: Record<Status, string> = {
  "Planned": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "In Progress": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  "Completed": "bg-green-100 text-green-800 hover:bg-green-200",
};

const allStatuses: Status[] = ["Planned", "In Progress", "Completed"];

export function FeatureCard({ request, onEdit, onDelete, onStatusChange }: FeatureCardProps) {
  const formattedDate = new Date(request.createdAt).toLocaleDateString("en-GB", { });

  return (
    <div className="border rounded-lg p-4 bg-card text-card-foreground shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">{request.title}</h3>
          <p className="text-sm text-muted-foreground">{request.description}</p>
        </div>
            <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(request)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(request.id)} disabled={false}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Badge variant={priorityVariants[request.priority]}>
            {request.priority}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button>
                <Badge className={statusStyles[request.status]}>
                  {request.status}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Badge>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {allStatuses.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => onStatusChange(request.id, s)}
                  className={s === request.status ? "font-semibold" : ""}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
        </div>
    <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
    </div>
  );
}