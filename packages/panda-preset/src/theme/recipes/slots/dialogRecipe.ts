import { defineSlotRecipe } from "@pandacss/dev";

export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  slots: [
    "underlay",
    "root",
    "title",
    "description",
    "content",
  ],
  base: {
    underlay: {
      position: "fixed",
      zIndex: "modal",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "black.a.5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    root: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      padding: "6",
      margin: "2",
      background: {
        base: "#fff",
        _dark: "gray.2",
      },
      border: "1px solid {colors.gray.6}",
      borderRadius: "3",
      color: "gray.12",
      width: "auto",
      boxShadow: "3",
    },
    title: {
      fontSize: "5",
      lineHeight: "5",
      letterSpacing: "1",
      fontWeight: "bold",
    },
    description: {
      fontSize: "2",
      lineHeight: "2",
    },
    content: {
    },
  },
  jsx: ["Dialog"],
});
