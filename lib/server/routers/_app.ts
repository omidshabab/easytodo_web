import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { todosRouter } from "./todos";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
