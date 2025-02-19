/* eslint-disable no-console */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { configure } from "@testing-library/react";
import { setupServer } from "msw/node";
import type { ReactElement, ReactNode } from "react";

import { getTodosExampleMock } from "@/gen/api";

export function setupStrictMode() {
  configure({ reactStrictMode: true });
}

export const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  // @ts-ignore
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
});

export const renderWithClient: (
  queryClient: QueryClient,
  ui: ReactElement
) => ReturnType<typeof render> & {
  rerender: (rerenderUi: ReactNode) => void,
} = (queryClient, ui) => {
  const { rerender, ...result } = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );

  return {
    ...result,
    rerender: (rerenderUi: ReactNode) =>
      rerender(
        <QueryClientProvider client={queryClient}>{rerenderUi}</QueryClientProvider>
      ),
  };
};

export function createWrapper(queryClient: QueryClient) {

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export const server = setupServer(...getTodosExampleMock());
