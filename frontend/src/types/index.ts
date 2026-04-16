export type Status = "Planned" | "In Progress" | "Completed";
export type Priority = "Low" | "Medium" | "High";

export interface FeatureRequest {
  id: number;
  title: string;
  description: string | null;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeatureInput {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
}

export interface UpdateFeatureInput {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
}

export interface FeatureQueryParams {
  status?: Status;
  priority?: Priority;
  fromDate?: string;
  toDate?: string;
}