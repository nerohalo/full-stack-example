import "@testing-library/jest-dom/vitest";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { server } from "@/__tests__/utils";

dayjs.extend(localizedFormat);

beforeAll(() => server.listen({
  onUnhandledRequest: "error",
}));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
