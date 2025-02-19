import { HStack, Stack } from "@css/styled-system/jsx";
import { Text } from "design-system";

import DesktopView from "@/components/TodoList/DesktopView";
import MobileView from "@/components/TodoList/MobileView";
import { useGetTodos } from "@/gen/api";
import { useIsMobile } from "@/hooks";

export default function TodoList() {
  const isMobile = useIsMobile();

  const { data, isLoading } = useGetTodos({
    query: {
      queryKey: ["todos"],
      gcTime: 1000,
      staleTime: 1000,
    },
  });

  if (!data && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack direction="column" gap="4" h="100%" overflowY="auto">
      <HStack
        justifyContent={{
          base: "center",
          sm: "start",
        }}
        px="3"
      >
        <Text
          size={{
            base: "7",
            sm: "8",
          }}
        >
          Tasks
        </Text>
      </HStack>

      {!isMobile ? <DesktopView todos={data} /> : <MobileView todos={data} />}

    </Stack>
  );
}
