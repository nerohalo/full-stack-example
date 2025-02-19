import { Box, HStack } from "@css/styled-system/jsx";
import dayjs from "dayjs";
import { Table } from "design-system";
import { Fragment, useState } from "react";
import type { SortDescriptor } from "react-stately";

import type { Todo } from "@/gen/types";

import AddListItem from "@/components/AddListItem";
import DeleteTaskButton from "@/components/TodoList/DeleteTaskButton";
import EditTaskButton from "@/components/TodoList/EditTaskButton";
import Status from "@/components/TodoList/Status";

type DesktopViewProps = {
  todos?: Array<Todo>,
};

const sortList = (
  items: Array<Todo>,
  sortDescriptor: SortDescriptor
): Array<Todo> => {
  const sortedItems = [...items];
  if (sortDescriptor && sortedItems.length > 0) {
    return sortedItems.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Todo];
      const second = b[sortDescriptor.column as keyof Todo];

      if (dayjs(first).isValid() && dayjs(second).isValid()) {
        let cmp = dayjs(first).isBefore(dayjs(second)) ? -1 : 1;

        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      }

      let cmp = (parseInt(first) || first) <
      (parseInt(second) || second)
        ? -1
        : 1;
      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }

  return sortedItems;
};

export default function DesktopView({ todos }: DesktopViewProps) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "status", direction: "descending" });
  const list = todos ? sortList(todos, sortDescriptor) : [];

  return (
    <Fragment>
      <Table
        fluid
        aria-label="Todo table"
        selectionMode="none"
        focusMode="row"
        sortDescriptor={sortDescriptor}
        onSortChange={(descriptor) => setSortDescriptor(descriptor)}
      >
        <Table.Header>
          <Table.Column key="status" allowsSorting>
            Status
          </Table.Column>
          <Table.Column key="name" allowsSorting>
            Task name
          </Table.Column>
          <Table.Column key="createdAt" allowsSorting>
            Created at
          </Table.Column>
          <Table.Column key="updatedAt" allowsSorting>
            Updated at
          </Table.Column>
          <Table.Column key="actions">
            Actions
          </Table.Column>
        </Table.Header>

        <Table.Body items={list}>
          {(item) => (
            <Table.Row>
              <Table.Cell>
                <Status status={item.status} />
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{dayjs(item.createdAt).format("lll")}</Table.Cell>
              <Table.Cell>{dayjs(item.updatedAt).format("lll")}</Table.Cell>
              <Table.Cell>
                <HStack gap="2" justifyContent="end">
                  <DeleteTaskButton todo={item} />

                  <EditTaskButton todo={item} />
                </HStack>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Box pb="3" px="3" w="100%">
        <AddListItem fluid />
      </Box>
    </Fragment>
  );
}
