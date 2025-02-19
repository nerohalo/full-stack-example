import { Badge } from "design-system";

import { TodoStatus } from "@/gen/types";
import type { Todo } from "@/gen/types";

import * as s from "./Status.css";

type Props = {
  status: Todo["status"],
};

const statusColorMap = {
  [TodoStatus.done]: "grass",
  [TodoStatus.ready_to_start]: "gray",
  [TodoStatus.in_progress]: "indigo",
} as const;

export default function Status({ status }: Props) {
  const transformedStatus = status !== undefined ? status.replaceAll("_", " ") : "";

  return (
    <Badge
      size={{
        base: "2",
        xs: "3",
      }}
      color={statusColorMap[status]}
      className={s.badge}
    >
      {transformedStatus}
    </Badge>
  );
}
