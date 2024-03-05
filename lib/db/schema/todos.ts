import { sql } from "drizzle-orm";
import { text, boolean, date, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getTodos } from "@/lib/api/todos/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const todos = pgTable('todos', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  completed: boolean("completed").notNull(),
  date: date("date").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for todos - used to validate API requests
const baseSchema = createSelectSchema(todos).omit(timestamps)

export const insertTodoSchema = createInsertSchema(todos).omit(timestamps);
export const insertTodoParams = baseSchema.extend({
  completed: z.coerce.boolean(),
  date: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateTodoSchema = baseSchema;
export const updateTodoParams = baseSchema.extend({
  completed: z.coerce.boolean(),
  date: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const todoIdSchema = baseSchema.pick({ id: true });

// Types for todos - used to type API request params and within Components
export type Todo = typeof todos.$inferSelect;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type NewTodoParams = z.infer<typeof insertTodoParams>;
export type UpdateTodoParams = z.infer<typeof updateTodoParams>;
export type TodoId = z.infer<typeof todoIdSchema>["id"];
    
// this type infers the return from getTodos() - meaning it will include any joins
export type CompleteTodo = Awaited<ReturnType<typeof getTodos>>["todos"][number];

