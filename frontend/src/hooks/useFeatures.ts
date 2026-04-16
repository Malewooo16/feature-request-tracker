import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { featureApi } from "../lib/api";
import type { CreateFeatureInput, UpdateFeatureInput, FeatureQueryParams, FeatureRequest, Status } from "../types";

export const FEATURE_QUERY_KEY = "features";

export function useFeatures(params?: FeatureQueryParams) {
  return useQuery({
    queryKey: [FEATURE_QUERY_KEY, params],
    queryFn: () => featureApi.getAll(params),
  });
}

export function useCreateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateFeatureInput) => featureApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEATURE_QUERY_KEY] });
    },
  });
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateFeatureInput }) =>
      featureApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEATURE_QUERY_KEY] });
    },
  });
}

export function useUpdateFeatureStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      featureApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEATURE_QUERY_KEY] });
    },
  });
}

export function useDeleteFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => featureApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEATURE_QUERY_KEY] });
    },
  });
}