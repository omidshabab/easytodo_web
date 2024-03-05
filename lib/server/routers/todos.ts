import { getTodoById, getTodos } from "@/lib/api/todos/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  todoIdSchema,
  insertTodoParams,
  updateTodoParams,
} from "@/lib/db/schema/todos";
import { createTodo, deleteTodo, updateTodo } from "@/lib/api/todos/mutations";

export const todosRouter = router({
  getTodos: publicProcedure.query(async () => {
    return getTodos();
  }),
  getTodoById: publicProcedure.input(todoIdSchema).query(async ({ input }) => {
    return getTodoById(input.id);
  }),
  createTodo: publicProcedure
    .input(insertTodoParams)
    .mutation(async ({ input }) => {
      return createTodo(input);
    }),
  updateTodo: publicProcedure
    .input(updateTodoParams)
    .mutation(async ({ input }) => {
      return updateTodo(input.id, input);
    }),
  deleteTodo: publicProcedure
    .input(todoIdSchema)
    .mutation(async ({ input }) => {
      return deleteTodo(input.id);
    }),
});
