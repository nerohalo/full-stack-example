import { Button, useDialogs } from "design-system";
import { Trash2 } from "lucide-react";

import type { Todo } from "@/gen/types";

import { DIALOGS } from "@/constants";

type Props = {
  todo: Todo,
};

export default function DeleteTaskButton({ todo }: Props) {
  const { showDialog } = useDialogs();

  return (
    <Button
      color="ruby"
      onPress={() => showDialog(DIALOGS.DELETE_TASKS_DIALOG, { ...todo })}
    >
      Delete
      <Trash2 size="16px" />
    </Button>
  );
}
