import { Stack } from "@css/styled-system/jsx";
import { Outlet } from "react-router";

import Header from "@/components/Header";

export default function DefaultLayout() {
  return (
    <Stack direction="column" h="100%">
      <Header />

      <Stack
        id="main-content"
        direction="column"
        h="100%"
        position="relative"
        overflowY="auto"
      >
        <Outlet />
      </Stack>
    </Stack>
  );
}
