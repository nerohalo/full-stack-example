import { Dialog, type DialogsContextType } from "design-system";

import AddTaskForm from "@/components/dialogs/AddTaskDialog/AddTaskForm";

type AddTaskDialogProps = {
  closeDialog: DialogsContextType["closeDialog"],
};

export default function AddTaskDialog({
  closeDialog,
}: AddTaskDialogProps) {
  return (
    <Dialog isOpen onOpenChange={closeDialog}>
      <Dialog.Content>
        <Dialog.Title>Add Task</Dialog.Title>
        <Dialog.Description>Add a new task</Dialog.Description>

        <AddTaskForm closeDialog={closeDialog} />
      </Dialog.Content>
    </Dialog>
  );
}
