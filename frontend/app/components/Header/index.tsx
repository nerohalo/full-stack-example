import { Box, HStack } from "@css/styled-system/jsx";

import * as s from "./Header.css";

import AddListItem from "@/components/AddListItem";
import DesktopNav from "@/components/Header/DesktopNav";
import MobileMenu from "@/components/Header/MobileMenu";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className={s.container}>
      <DesktopNav />

      <Box
        display={{
          base: "flex",
          sm: "none",
        }}
      >
        <AddListItem />
      </Box>

      <HStack
        width={{
          base: "100%",
          sm: "auto",
        }}
        justify={{
          base: "end",
          sm: "space-between",
        }}
        gap="2"
      >
        <ThemeToggle size="2" />

        <MobileMenu />
      </HStack>
    </header>
  );
}
