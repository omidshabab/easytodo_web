"use client";
import { CompleteTodo } from "@/lib/db/schema/todos";
import { trpc } from "@/lib/trpc/client";
import TodoModal from "./TodoModal";


export default function TodoList({ todos }: { todos: CompleteTodo[] }) {
  const { data: t } = trpc.todos.getTodos.useQuery(undefined, {
    initialData: { todos },
    refetchOnMount: false,
  });

  if (t.todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

const Todo = ({ todo }: { todo: CompleteTodo }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{todo.title}</div>
      </div>
      <TodoModal todo={todo} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No todos
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new todo.
      </p>
      <div className="mt-6">
        <TodoModal emptyState={true} />
      </div>
    </div>
  );
};

