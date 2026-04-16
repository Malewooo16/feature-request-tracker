import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { CreateFeatureInput, Priority, Status } from "../types";

const featureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Planned", "In Progress", "Completed"]),
});

type FeatureFormData = z.infer<typeof featureSchema>;

interface EditingFeature {
  id: number;
  title: string;
  description: string | null;
  priority: Priority;
  status: Status;
}

interface FeatureFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: EditingFeature;
  onSubmit: (data: CreateFeatureInput) => void;
  isPending?: boolean;
  error?: string | null;
}

export function FeatureFormDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
  isPending = false,
  error = null,
}: FeatureFormDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FeatureFormData>({
    resolver: zodResolver(featureSchema),
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title,
        description: initial.description || "",
        priority: initial.priority,
        status: initial.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "Low",
        status: "Planned",
      });
    }
  }, [initial, open, reset]);

  const handleFormSubmit = (data: FeatureFormData) => {
    onSubmit({
      title: data.title,
      description: data.description,
      priority: data.priority as Priority,
      status: data.status as Status,
    });
  };

  const handleClose = (isOpen: boolean) => {
    if (!isPending) {
      onOpenChange(isOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit Feature Request" : "New Feature Request"}
          </DialogTitle>
          <DialogDescription>
            {initial
              ? "Update the feature request details below."
              : "Fill in the details for your new feature request."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <label htmlFor="title">Title</label>
              <Input id="title" {...register("title")} disabled={isPending} />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <Textarea id="description" {...register("description")} disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="priority">Priority</label>
              <Select
                defaultValue={initial?.priority || "Low"}
                onValueChange={(v) => setValue("priority", v as Priority)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <Select
                defaultValue={initial?.status || "Planned"}
                onValueChange={(v) => setValue("status", v as Status)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending 
                ? (initial ? "Updating..." : "Creating...") 
                : (initial ? "Update" : "Create")
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}