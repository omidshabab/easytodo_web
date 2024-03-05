import TodoList from "@/components/todos/TodoList";
import NewTodoModal from "@/components/todos/TodoModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Todos() {
  await checkAuth();
  const { todos } = await api.todos.getTodos.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Todos</h1>
        <NewTodoModal />
      </div>
      <TodoList todos={todos} />
    </main>
  );
}
