import { Stack } from "@css/styled-system/jsx";

import TodoList from "@/components/TodoList";

export default function Dashboard() {
  return (
    <Stack gap="4">
      <TodoList />
    </Stack>
  );
}
