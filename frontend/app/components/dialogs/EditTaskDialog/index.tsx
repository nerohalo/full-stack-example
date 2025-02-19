import { Dialog, type DialogsContextType } from "design-system";

import type { Todo } from "@/gen/types";

import EditTaskForm from "@/components/dialogs/EditTaskDialog/EditTaskForm";

type EditTaskDialogProps = Pick<DialogsContextType, "closeDialog"> & { data: Todo };

export default function EditTaskDialog({
  closeDialog,
  data,
}: EditTaskDialogProps) {
  return (
    <Dialog isOpen onOpenChange={closeDialog}>
      <Dialog.Content>
        <Dialog.Title>Edit Task</Dialog.Title>
        <Dialog.Description>Make changes to the task</Dialog.Description>

        <EditTaskForm closeDialog={closeDialog} data={data} />
      </Dialog.Content>
    </Dialog>
  );
}
