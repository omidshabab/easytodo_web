import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  TodoId,
  NewTodoParams,
  UpdateTodoParams,
  updateTodoSchema,
  insertTodoSchema,
  todos,
  todoIdSchema,
} from "@/lib/db/schema/todos";
import { getUserAuth } from "@/lib/auth/utils";

export const createTodo = async (todo: NewTodoParams) => {
  const { session } = await getUserAuth();
  const newTodo = insertTodoSchema.parse({
    ...todo,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(todos).values(newTodo).returning();
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTodo = async (id: TodoId, todo: UpdateTodoParams) => {
  const { session } = await getUserAuth();
  const { id: todoId } = todoIdSchema.parse({ id });
  const newTodo = updateTodoSchema.parse({
    ...todo,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(todos)
      .set({ ...newTodo, updatedAt: new Date() })
      .where(and(eq(todos.id, todoId!), eq(todos.userId, session?.user.id!)))
      .returning();
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTodo = async (id: TodoId) => {
  const { session } = await getUserAuth();
  const { id: todoId } = todoIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(todos)
      .where(and(eq(todos.id, todoId!), eq(todos.userId, session?.user.id!)))
      .returning();
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
