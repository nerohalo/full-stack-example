import { HStack, Stack } from "@css/styled-system/jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Select,
  TextField,
  type DialogsContextType,
  useNotification,
} from "design-system";
import { Controller, useForm } from "react-hook-form";
import { Item } from "react-stately";
import * as z from "zod";

import { Todo, TodoStatus } from "@/gen/types";

import { useCreateTodo } from "@/gen/api";

const createTodoSchema = z
  .object({
    name: z.string().min(3).max(60).nonempty(),
    status: z.nativeEnum(TodoStatus),
  }).required();

type CreateTodoSchema = z.infer<typeof createTodoSchema>;

type AddTaskFormProps = {
  closeDialog: DialogsContextType["closeDialog"],
};

export default function AddTaskForm({ closeDialog }: AddTaskFormProps) {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
  });

  const { mutateAsync: createTodo } = useCreateTodo({
    mutation: {
      onSuccess: async(newTodo) => {
        await queryClient.cancelQueries({ queryKey: ["todos"] });
        const previousTodos = queryClient.getQueryData<Array<Todo>>(["todos"]);
        queryClient.setQueryData(["todos"], (oldTodos: Array<Todo>) => [...oldTodos, newTodo]);

        closeDialog();

        return { previousTodos };
      },
      onSettled: async() => {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    },
  });

  const onSubmit = async(data: CreateTodoSchema) => {
    await createTodo({ data }).catch(() => {
      showNotification({
        appearance: "negative",
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="add-task-form">
      <Stack direction="column" gap="4" mt="4">
        <Controller
          control={control}
          defaultValue=""
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              fluid
              autoFocus={false}
              label="Task name"
              placeholder="Enter task name"
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
              fluid
              placeholder="Pick a status"
              selectedKey={value || null}
              onSelectionChange={(value) => {
                onChange(value);
              }}
              errorMessage={errors.status?.message}
            >
              <Item key={TodoStatus.done}>Done</Item>
              <Item key={TodoStatus.in_progress}>In progress</Item>
              <Item key={TodoStatus.ready_to_start}>Ready to start</Item>
            </Select>
          )}
        />
      </Stack>

      <HStack gap="3" mt="6" justifyContent="end">
        <Button type="button" color="ruby" onPress={closeDialog}>
          Cancel
        </Button>

        <Button type="submit">
          Save
        </Button>
      </HStack>
    </form>
  );
}
