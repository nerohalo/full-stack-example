import { HStack, Stack } from "@css/styled-system/jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Select,
  TextField,
  type  DialogsContextType, useNotification,
} from "design-system";
import { Controller, useForm } from "react-hook-form";
import { Item } from "react-stately";
import * as z from "zod";

import { TodoStatus } from "@/gen/types";
import type { Todo } from "@/gen/types";

import { useUpdateTodo } from "@/gen/api";

const createTodoSchema = z
  .object({
    name: z.string().min(3).max(60).nonempty(),
    status: z.nativeEnum(TodoStatus),
  }).required();

type CreateTodoSchema = z.infer<typeof createTodoSchema>;

type EditTaskFormProps = {
  closeDialog: DialogsContextType["closeDialog"],
  data: Todo,
};

export default function EditTaskForm({ closeDialog, data }: EditTaskFormProps) {
  const { showNotification } = useNotification();
  const {
    id,
    status,
    name,
  } = data;
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      name,
      status: status,
    },
  });

  const { mutateAsync: updateTodo } = useUpdateTodo({
    mutation: {
      onSuccess: async(newTodo) => {
        await queryClient.cancelQueries({ queryKey: ["todos"] });

        queryClient.setQueryData(["todos"], (oldTodos: Array<Todo>) => oldTodos.map((oldTodo) => {
          if (oldTodo.id === id) {
            return newTodo;
          }

          return oldTodo;
        }));

        closeDialog();
      },
    },
  });

  const onSubmit = async(formData: CreateTodoSchema) => {
    await updateTodo({
      id,
      data: formData,
    }).catch(() => {
      showNotification({
        appearance: "negative",
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="edit-task-form">
      <Stack direction="column" gap="4" mt="4">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fluid
              autoFocus={false}
              placeholder="Enter task name"
              label="Task name"
              isInvalid={fieldState.invalid}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Status"
              placeholder="Pick a status"
              fluid
              onSelectionChange={(value) => {
                onChange(value);
              }}
              selectedKey={value}
            >
              <Item key={TodoStatus.done}>Done</Item>
              <Item key={TodoStatus.in_progress}>In progress</Item>
              <Item key={TodoStatus.ready_to_start}>Ready to start</Item>
            </Select>
          )}
        />
      </Stack>

      <HStack gap="3" mt="6" justifyContent="end">
        <Button
          type="button"
          color="ruby"
          onPress={closeDialog}
        >
          Cancel
        </Button>

        <Button type="submit" isDisabled={!isDirty}>
          Save
        </Button>
      </HStack>
    </form>
  );
}
