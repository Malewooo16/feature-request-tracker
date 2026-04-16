import { useState } from "react";
import { Plus, ListFilter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker, DateRange } from "@/components/ui/date-range-picker";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useFeatures, useCreateFeature, useUpdateFeature, useUpdateFeatureStatus, useDeleteFeature } from "@/hooks/useFeatures";
import type { Status, CreateFeatureInput } from "@/types";
import { FeatureCard } from "@/components/FeatureCard";
import { FeatureFormDialog } from "@/components/FeatureFormDialog";

export default function Index() {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<{
    id: number;
    title: string;
    description: string | null;
    priority: "Low" | "Medium" | "High";
    status: Status;
  } | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const queryParams = {
    ...(statusFilter !== "All" && { status: statusFilter }),
    fromDate: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : undefined,
    toDate: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : undefined,
  };

  // React Query hooks
  const { data: requests = [], isLoading, error } = useFeatures(queryParams);
  const createMutation = useCreateFeature();
  const updateMutation = useUpdateFeature();
  const updateStatusMutation = useUpdateFeatureStatus();
  const deleteMutation = useDeleteFeature();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleEdit = (r: {
    id: number;
    title: string;
    description: string | null;
    priority: "Low" | "Medium" | "High";
    status: Status;
  }) => {
    setEditing(r);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    if (!isSubmitting) {
      setFormOpen(open);
      if (!open) setEditing(undefined);
    }
  };

  const handleSubmit = (data: CreateFeatureInput) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, input: data },
        {
          onSuccess: () => {
            setFormOpen(false);
            setEditing(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId !== null) {
      deleteMutation.mutate(deletingId, {
        onSuccess: () => {
          setDeleteConfirmOpen(false);
          setDeletingId(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setDeletingId(null);
  };

  const handleStatusChange = (id: number, status: Status) => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <div className="min-h-screen bg-background">
    

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your feature requests
            </p>
          </div>
          <Button
            onClick={() => {
              setEditing(undefined);
              setFormOpen(true);
            }}
            className="gap-2"
            disabled={createMutation.isPending}
          >
            <Plus className="h-4 w-4" />
            {createMutation.isPending ? "Creating..." : "New Request"}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as Status | "All")}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive">Error loading features</p>
          </div>
        )}

        {/* List */}
        {!isLoading && !error && requests.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No feature requests found.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFormOpen(true)}
            >
              Add your first request
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
              <FeatureCard
                key={r.id}
                request={r}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        <FeatureFormDialog
          key={editing?.id ?? "new"}
          open={formOpen}
          onOpenChange={handleFormClose}
          initial={editing}
          onSubmit={handleSubmit}
          isPending={isSubmitting}
          error={createMutation.error?.message || updateMutation.error?.message}
        />

        <ConfirmDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          title="Delete Feature Request"
          description="Are you sure you want to delete this feature request? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
          onConfirm={handleConfirmDelete}
          isLoading={deleteMutation.isPending}
        />
      </div>
    </div>
  );
}