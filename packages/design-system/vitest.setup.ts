/**
 * Global Test Setup File
 *
 * This file includes global configurations and setups to support consistent testing behavior across the test suite.
 * It configures tools and polyfills required for specific testing scenarios and ensures that tests behave predictably.
 */

import "@testing-library/jest-dom/vitest";

import { MotionGlobalConfig } from "framer-motion";
import resizeObserverPolyfill from "resize-observer-polyfill";
import { vi } from "vitest";

// Disable animations globally during tests to avoid flakiness caused by animations
MotionGlobalConfig.skipAnimations = true;

/**
 * Stub a global object "jest" with a vitest method for advancing timers.
 * This helps bridge compatibility for test scenarios that rely on advancing timers using jest under the hood.
 * Since React testing library user event uses jest under the hood this is necessary for vitest environments.
 * https://github.com/testing-library/user-event/issues/1115
 * https://github.com/testing-library/react-testing-library/issues/1197
 * `jest.advanceTimersByTime` calls are mapped to `vi.advanceTimersByTime`.
 */
vi.stubGlobal("jest", { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) });

/**
 * Assign a polyfill for ResizeObserver to the global object.
 * This ensures that tests relying on ResizeObserver (e.g., layout or DOM size changes) behave as expected,
 * even in environments where the native ResizeObserver API is unavailable.
 */
global.ResizeObserver = resizeObserverPolyfill;
