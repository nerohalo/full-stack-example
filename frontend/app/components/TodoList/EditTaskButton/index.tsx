import { Button, useDialogs } from "design-system";
import { Pencil } from "lucide-react";

import type { Todo } from "@/gen/types";

import { DIALOGS } from "@/constants";

export type EditTaskButtonProps = {
  todo: Todo,
};

export default function EditTaskButton({ todo }: EditTaskButtonProps) {
  const { showDialog } = useDialogs();

  return (
    <Button
      color="gray"
      onPress={() => showDialog(DIALOGS.EDIT_TASKS_DIALOG, { ...todo })}
    >
      Edit
      <Pencil size="16px" />
    </Button>
  );
}
