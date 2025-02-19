import { css } from "@css/styled-system/css";

export const container = css({
  display: "flex",
  zIndex: "max",
  position: "sticky",
  top: 0,
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "4",
  height: "16",
  background: "gray.1",
  boxShadow: "0 1px 0 0 {colors.gray.8}",
});
