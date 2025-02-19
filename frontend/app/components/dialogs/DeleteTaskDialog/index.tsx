import { Stack } from "@css/styled-system/jsx";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  type DialogsContextType,
  Button,
  Text, useNotification,
} from "design-system";

import type { Todo } from "@/gen/types";

import { useDeleteTodo } from "@/gen/api";

type DeleteTaskDialogProps = Pick<DialogsContextType, "closeDialog"> & { data: Todo };

export default function DeleteTaskDialog({
  closeDialog,
  data,
}: DeleteTaskDialogProps) {
  const { showNotification } = useNotification();

  const { id } = data;
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTodo } = useDeleteTodo({
    mutation: {
      onSuccess: async(_, variables) => {
        await queryClient.cancelQueries({ queryKey: ["todos"] });

        await queryClient.setQueryData(
          ["todos"],
          (oldTodos: Array<Todo>) => oldTodos.filter((todo) => todo.id !== variables.id)
        );

        closeDialog();
      },
    },
  });

  const handleDeleteTask = async() => {
    await deleteTodo({ id }).catch(() => {
      showNotification({
        appearance: "negative",
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    });
  };

  return (
    <Dialog isOpen onOpenChange={closeDialog}>
      <Dialog.Content>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Text
          color="ruby"
          size={{
            base: "3",
            xs: "2",
          }}
        >
          This will permanently delete the task.
        </Text>

        <Stack gap="3" mt="4" justifyContent="end">
          <Button type="button" color="ruby" onPress={closeDialog}>
            Cancel
          </Button>

          <Button type="submit" onPress={handleDeleteTask}>
            Continue
          </Button>
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
}
