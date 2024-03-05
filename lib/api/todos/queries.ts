import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type TodoId, todoIdSchema, todos } from "@/lib/db/schema/todos";

export const getTodos = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(todos).where(eq(todos.userId, session?.user.id!));
  const t = rows
  return { todos: t };
};

export const getTodoById = async (id: TodoId) => {
  const { session } = await getUserAuth();
  const { id: todoId } = todoIdSchema.parse({ id });
  const [row] = await db.select().from(todos).where(and(eq(todos.id, todoId), eq(todos.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { todo: t };
};


