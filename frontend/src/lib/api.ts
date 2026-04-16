import axios from "axios";
import type { FeatureRequest, CreateFeatureInput, UpdateFeatureInput, FeatureQueryParams } from "../types";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3300/api";

const api = axios.create({
  baseURL: `${baseURL}/features`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const featureApi = {
  getAll: async (params?: FeatureQueryParams): Promise<FeatureRequest[]> => {
    const { data } = await api.get("/", { params });
    return data;
  },

  create: async (input: CreateFeatureInput): Promise<FeatureRequest> => {
    const { data } = await api.post("/", input);
    return data;
  },

  update: async (id: number, input: UpdateFeatureInput): Promise<FeatureRequest> => {
    const { data } = await api.put(`/${id}`, input);
    return data;
  },

  updateStatus: async (id: number, status: string): Promise<FeatureRequest> => {
    const { data } = await api.patch(`/${id}/status`, { status });
    return data;
  },

  delete: async (id: number): Promise<{ success: boolean }> => {
    const { data } = await api.delete(`/${id}`);
    return data;
  },
};

export default api;