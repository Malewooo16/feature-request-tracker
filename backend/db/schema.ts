import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority_enum", ["Low", "Medium", "High"]);
export const statusEnum = pgEnum("status_enum", ["Open","Planned", "In Progress", "Completed"]);

export type Status = (typeof statusEnum.enumValues)[number];
export type Priority = (typeof priorityEnum.enumValues)[number];

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  description: text("description"),
  priority: priorityEnum("priority"),
  status: statusEnum("status"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=> new Date()),
});