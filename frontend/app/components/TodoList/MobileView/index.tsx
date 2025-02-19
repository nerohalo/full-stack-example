import { Stack } from "@css/styled-system/jsx";

import type { Todo } from "@/gen/types";

import ListItem from "@/components/TodoList/MobileView/ListItem";

type MobileViewProps = {
  todos?: Array<Todo>,
};

export default function MobileView({ todos }: MobileViewProps) {
  return (
    <Stack direction="column" gap="4" h="100%" pb="4">
      {todos && todos?.length > 0 && todos.map((todo) => (
        <ListItem key={todo.id} todo={todo} />
      ))}
    </Stack>
  );
}
