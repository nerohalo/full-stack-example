import { defineSlotRecipe } from "@pandacss/dev";

export const textFieldRecipe = defineSlotRecipe({
  className: "textField",
  slots: ["root", "control","input", "label"],
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
      display: "flex",
      flex: "1 1 100%",
      borderRadius: "2",
      overflow: "hidden",
    },
    input: {
      height: "8",
      minWidth: "172px",
      paddingX: "2",
      flex: "1 1 100%",
      fontSize: "2",
      lineHeight: "2",
      border: "none",
      outline: "none",
      appearance: "none",
      background: {
        base: "#ffffffd9",
        _dark: "#00000040",
      },
      _autofill: {
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "{colors.gray.11}",
        transition: "background-color 5000s ease-in-out 0s",
        boxShadow: "0 0 0px 1000px {colors.black.a.3} inset",
      },
      _placeholder: {
        color: "gray.8",
        opacity: 1, // Firefox
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
          _focusWithin: {
            outline: "2px solid {colors.ruby.8}",
            outlineOffset: "-1px",
          },
        },
        input: {
          color: "ruby.11",
        },
      },
      grass: {
        control: {
          border: "1px solid {colors.grass.8}",
          _focusWithin: {
            outline: "2px solid {colors.grass.8}",
            outlineOffset: "-1px",
          },

        },
        input: {
          color: "grass.11",
        },
      },
      orange: {
        control: {
          border: "1px solid {colors.orange.8}",
          _focusWithin: {
            outline: "2px solid {colors.orange.8}",
            outlineOffset: "-1px",
          },
        },
        input: {
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
        input: {
          color: "gray.12",
        },
      },
    },
  },
  defaultVariants: {
    fluid: false,
    color: "gray",
  },
  staticCss: [{ color: ["*"] }],
  jsx: ["TextField"],
});
