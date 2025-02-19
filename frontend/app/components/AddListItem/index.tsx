import type { ButtonRecipeVariantProps } from "@css/styled-system/recipes";
import { useDialogs, Button } from "design-system";
import { Plus } from "lucide-react";

import { DIALOGS } from "@/constants";

export default function AddListItem({
  fluid,
  color = "indigo",
  ...rest
}: ButtonRecipeVariantProps) {
  const { showDialog } = useDialogs();

  return (
    <Button
      {...rest}
      color={color}
      fluid={fluid}
      onPress={() => {
        showDialog(DIALOGS.ADD_TASKS_DIALOG);
      }}
    >
      Add Task
      <Plus width="20px" height="20px" />
    </Button>
  );
}
