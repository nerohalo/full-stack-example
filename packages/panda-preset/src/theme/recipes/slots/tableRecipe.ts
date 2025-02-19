import { defineSlotRecipe } from "@pandacss/dev";

export const tableRecipe = defineSlotRecipe({
  className: "table",
  slots: [
    "root",
    "header",
    "headerRow",
    "headerColumn",
    "body",
    "row",
    "cell",
    "checkboxCell",
  ],
  base: {
    root: {
      fontSize: "2",
      lineHeight: "2",
      textAlign: "left",
      verticalAlign: "top",
      borderCollapse: "collapse",
      borderRadius: "4",
      borderSpacing: 0,
    },
    header: {
      verticalAlign: "inherit",
    },
    headerRow: {
      verticalAlign: "inherit",
      color: "gray.12",
    },
    headerColumn: {
      display: "flex",
      gap: "2",
      width: "100%",
      fontWeight: "bold",
      alignItems: "center",
    },
    body: {
      verticalAlign: "inherit",
    },
    row: {
      verticalAlign: "inherit",
      color: "gray.12",
    },
    cell: {
      verticalAlign: "inherit",
      borderBottom: "1px solid {colors.gray.7}",
      height: "11",
      padding: "3",
    },
    checkboxCell: {},
  },
  variants: {
    fluid: {
      true: {
        root: {
          width: "100%",
        },
      },
      false: {
        root: {
          width: "fit-content",
        },
      },
    },
    verticalAlign: {
      top: {
        root: {
          verticalAlign: "top",
        },
      },
      middle: {
        root: {
          verticalAlign: "middle",
        },
      },
      bottom: {
        root: {
          verticalAlign: "bottom",
        },
      },
    },
  },
  defaultVariants: {
    fluid: false,
    verticalAlign: "middle",
  },
  jsx: ["Table"],
});
