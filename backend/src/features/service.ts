import { and, desc, eq, gte, not } from "drizzle-orm";
import { db } from "../../db/dbconnection";
import { features, Priority,  Status,  } from "../../db/schema";


export async function getAllFeatures(filters?: { status?: Status; priority?: Priority; fromDate?: string; toDate?: string }) {
 try{
    const whereClauses = [];
    if (filters?.status) {
      whereClauses.push(eq(features.status, filters.status));
    }
    if (filters?.priority) {
      whereClauses.push(eq(features.priority, filters.priority));
    }
    if (filters?.fromDate) {
      whereClauses.push(gte(features.createdAt, new Date(filters.fromDate)));
    }
    if (filters?.toDate) {
      whereClauses.push(gte(features.createdAt, new Date(filters.toDate)));
    }
    const allFeatures = await db.select().from(features).where(and(...whereClauses)).orderBy(desc(features.createdAt));
    return allFeatures;
 } catch (error) {    
    console.error("Error fetching features:", error);
    throw new Error("Could not fetch features", { cause: error });
 }
}

export async function createFeature(featureData: Omit<typeof features.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  try {
    const [newFeature] = await db.insert(features).values(featureData).returning();
    return newFeature;
  } catch (error) {
    console.error("Error creating feature:", error);
    throw new Error("Could not create feature", { cause: error });
  }
}

export async function updateFeature(id: number, featureData: Partial<Omit<typeof features.$inferInsert, "id" | "createdAt" | "updatedAt">>) {
  try {
    const [updatedFeature] = await db.update(features).set(featureData).where(eq(features.id, id)).returning();
    return updatedFeature;
  } catch (error) {
    console.error("Error updating feature:", error);
    throw new Error("Could not update feature");
  }
}

export async function updateFeatureStatus(id: number, status: Status) {
  try {
    const [updatedFeature] = await db.update(features).set({ status }).where(eq(features.id, id)).returning();
    return updatedFeature;
  }
    catch (error) {
    console.error("Error updating feature status:", error);
    throw new Error("Could not update feature status");
  }
}

export async function deleteFeature(id: number) {
  try {
    // Add .returning() to get the deleted row back
    const result = await db
      .delete(features)
      .where(eq(features.id, id))
      .returning();

    // If the array is empty, no row was deleted
    if (result.length === 0) {
      return null;
    }

    return { message: "Feature deleted successfully", data: result[0] };
  } catch (error) {
    console.error("Error deleting feature:", error);
    throw new Error("Could not delete feature");
  }
}