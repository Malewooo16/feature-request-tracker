import { z } from "zod";

export const featureQuerySchema = z.object({
   status: z.enum(["Planned", "In Progress", "Completed"]).optional(),
   priority: z.enum(["Low", "Medium", "High"]).optional(),
   fromDate: z.string().optional(),
   toDate: z.string().optional(),
});

export const createFeatureSchema = z.object({
   title: z.string("Not a string").min(1, "Title is required"),
   description: z.string("Not a string"),
   priority: z.enum(["Low", "Medium", "High"]),
   status: z.enum(["Planned", "In Progress", "Completed"]),
});

export const updateFeatureSchema = z.object({
   title: z.string("Not a string").min(1, "Title is required").optional(),
   description: z.string("Not a string").optional(),
   priority: z.enum(["Low", "Medium", "High"]).optional(),
   status: z.enum(["Planned", "In Progress", "Completed"]).optional(),
}).refine((data) => Object.keys(data).length > 0, {
   message: "At least one field must be provided for update",
}); // This will ensure that at least one field is provided for update

export const updateFeatureStatusSchema = z.object({
   status: z.enum(["Planned", "In Progress", "Completed"]),
}).strict(); // This will ensure only the status field is accepted