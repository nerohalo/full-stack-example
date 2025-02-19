import { defineSlotRecipe } from "@pandacss/dev";

export const selectRecipe = defineSlotRecipe({
  className: "select",
  slots: [
    "root",
    "label",
    "control",
    "value",
    "placeholder",
    "valueIndicator",
    "listBox",
    "option",
  ],
  base: {
    root: {
      display: "inline-flex",
      flexDirection: "column",
      gap: "1",
    },
    label: {
      textTransform: "capitalize",
      display: "flex",
      alignItems: "center",
      color: "gray.11",
    },
    control: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: "172px",
      userSelect: "none",
      cursor: "pointer",
      background: {
        base: "#ffffffd9",
        _dark: "#00000040",
      },
      paddingX: "3",
      gap: "calc({spacing.1} * 1.5)",
      appearance: "none",
      fontSize: "2",
      lineHeight: "2",
      borderRadius: "2",
      height: "8",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    value: {},
    placeholder: {
      color: "gray.8",
    },
    valueIndicator: {},
    listBox: {
      display: "inline-flex",
      gap: "1",
      flexDirection: "column",
      width: "100%",
    },
    option: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "4",
      paddingX: "2",
      height: "8",
      fontSize: "2",
      lineHeight: "2",
      cursor: "pointer",
      outline: "none",
      _hover: {
        backgroundColor: "indigo.5",
      },
      _focusVisible: {
        backgroundColor: "indigo.5",
      },
    },
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
          width: "min-content",
        },
      },
    },
    color: {
      ruby: {
        control: {
          border: "1px solid {colors.ruby.8}",
          _hover: {
            border: "1px solid {colors.ruby.9}",
          },
          _focusWithin: {
            outline: "2px solid {colors.ruby.8}",
            outlineOffset: "-1px",
          },
        },
        valueIndicator: {
          stroke: "ruby.7",
        },
        value: {
          color: "ruby.11",
        },
      },
      grass: {
        control: {
          border: "1px solid {colors.grass.7}",
          _hover: {
            border: "1px solid {colors.grass.8}",
          },
          _focusWithin: {
            outline: "2px solid {colors.grass.8}",
            outlineOffset: "-1px",
          },
        },
        valueIndicator: {
          stroke: "grass.7",
        },
        value: {
          color: "gray.11",
        },
      },
      orange: {
        control: {
          border: "1px solid {colors.orange.7}",
          _hover: {
            border: "1px solid {colors.orange.8}",
          },
          _focusWithin: {
            outline: "2px solid {colors.orange.8}",
            outlineOffset: "-1px",
          },
        },
        valueIndicator: {
          stroke: "orange.7",
        },
        value: {
          color: "orange.11",
        },
      },
      gray: {
        control: {
          border: "1px solid {colors.gray.7}",
          _hover: {
            border: "1px solid {colors.gray.8}",
          },
          _focusWithin: {
            outline: "2px solid {colors.indigo.8}",
            outlineOffset: "-1px",
          },
        },
        valueIndicator: {
          stroke: "gray.7",
        },
        value: {
          color: "gray.12",
        },
      },
    },
  },
  defaultVariants: {
    fluid: false,
    color: "gray",
  },
  jsx: ["Select"],
  staticCss: [{ color: ["*"] }],
});
