import { configure } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Applies strict mode setup to test for React-specific issues (like side effects and warnings).
export function setupStrictMode() {
  configure({ reactStrictMode: true });
}

// Set up a userEvent instance for simulating user interactions. Remove artificial delay.
export const user = userEvent.setup({ delay: null });
