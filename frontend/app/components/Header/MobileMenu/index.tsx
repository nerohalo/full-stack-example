import { Box } from "@css/styled-system/jsx";
import { IconButton } from "design-system";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import MobileNav from "@/components/Header/MobileMenu/MobileNav";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow =  mobileNavOpen ? "hidden" : "";
    }

    if (!mobileNavOpen && document.body.style.overflow === "hidden"){
      document.body.removeAttribute("style");
    }

  }, [mobileNavOpen]);

  return (
    <Box
      display={{
        base: "flex",
        sm: "none",
      }}
    >
      <IconButton
        color="gray"
        size="2"
        onPress={() => {
          setMobileNavOpen(!mobileNavOpen);
        }}
      >
        <Menu width="16" height="16" />
      </IconButton>

      <Box display={mobileNavOpen ? "block" : "none"}>
        <MobileNav onLinkClick={() => setMobileNavOpen(false)} />
      </Box>
    </Box>
  );
}
