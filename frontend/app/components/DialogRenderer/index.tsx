import type { DialogsContextType } from "design-system";

import AddTaskDialog from "@/components/dialogs/AddTaskDialog";
import DeleteTaskDialog from "@/components/dialogs/DeleteTaskDialog";
import EditTaskDialog from "@/components/dialogs/EditTaskDialog";
import { DIALOGS } from "@/constants";

const DialogRenderer = ({ name, data, closeDialog }: DialogsContextType) => {
  const getDialog = () => {
    switch (name) {
      case DIALOGS.ADD_TASKS_DIALOG:
        return (
          <AddTaskDialog
            closeDialog={closeDialog}
          />
        );
      case DIALOGS.EDIT_TASKS_DIALOG:
        return (
          <EditTaskDialog
            data={data}
            closeDialog={closeDialog}
          />
        );
      case DIALOGS.DELETE_TASKS_DIALOG:
        return (
          <DeleteTaskDialog
            data={data}
            closeDialog={closeDialog}
          />
        );
      default:
        return null;
    }
  };

  return getDialog();
};

export default DialogRenderer;
