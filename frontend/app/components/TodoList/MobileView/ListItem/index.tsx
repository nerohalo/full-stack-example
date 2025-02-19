import { HStack, Stack } from "@css/styled-system/jsx";
import dayjs from "dayjs";
import { Text, Collapsible } from "design-system";
import { CollapsibleContext } from "design-system";
import { Fragment } from "react";

import type { Todo } from "@/gen/types";

import * as s from "./ListItem.css";

import DeleteTaskButton from "@/components/TodoList/DeleteTaskButton";
import EditTaskButton from "@/components/TodoList/EditTaskButton";
import Status from "@/components/TodoList/Status";

type Props = {
  todo: Todo,
};

export default function ListItem({ todo }: Props) {
  const {
    name,
    createdAt,
    updatedAt,
    status,
  } = todo;

  const localizedCreatedAt = dayjs(createdAt).format("lll");
  const localizedUpdatedAt = dayjs(updatedAt).format("lll");

  return (
    <Stack gap="0" px="3">
      <Collapsible>
        <CollapsibleContext.Consumer>
          {({ state }) => (
            <Fragment>
              <Collapsible.Trigger className={s.trigger({ expanded: state.isExpanded })}>
                <Stack
                  direction="row"
                  gap="4"
                  pr="3"
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Status status={status} />

                  <Text
                    size={{
                      base: "3",
                      xs: "4",
                    }}
                    weight="bold"
                  >
                    {name}
                  </Text>
                </Stack>
              </Collapsible.Trigger>

              <Collapsible.Panel className={s.expandedContent}>
                <Stack direction="column" gap="4">
                  <HStack alignItems="center" w="100%" justifyContent="space-between">
                    <Text size="3">
                      Created at
                    </Text>

                    <Text size="1">
                      {localizedCreatedAt}
                    </Text>
                  </HStack>

                  <HStack alignItems="center" w="100%" justifyContent="space-between">
                    <Text size="3">
                      Updated at
                    </Text>

                    <Text size="1">
                      {localizedUpdatedAt}
                    </Text>
                  </HStack>

                  <Stack gap="2" justifyContent="end" w="100%">
                    <DeleteTaskButton todo={todo} />

                    <EditTaskButton todo={todo} />
                  </Stack>
                </Stack>
              </Collapsible.Panel>
            </Fragment>
          )}
        </CollapsibleContext.Consumer>
      </Collapsible>
    </Stack>
  );
}
