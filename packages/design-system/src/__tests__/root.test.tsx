import { describe, expect } from "vitest";

import {
  useSetupFloating,
  useResizeObserver,
  useCalculateProgressCircle,
  filterDOMProps,
  generateRandomHex,
  mergeRefs,
  NotificationsProvider,
  useNotification,
  NotificationsContext,
  DialogsProvider,
  DialogsContext,
  useDialogs,
  Badge,
  Button,
  Checkbox,
  Collapsible,
  Dialog,
  Draggable,
  IconButton,
  Popover,
  Portal,
  ProgressCircle,
  Select,
  Table,
  Text,
  TextField,
  Tooltip,
} from "../index.ts";

describe("exports properly", () => {
  describe("exports helpers", () => {
    it("should export filterDOMProps", () => {
      expect(filterDOMProps).toBeDefined();
      expect(typeof filterDOMProps).toBe("function");
    });

    it("should export generateRandomHex", () => {
      expect(generateRandomHex).toBeDefined();
      expect(typeof generateRandomHex).toBe("function");
    });

    it("should export mergeRefs", () => {
      expect(mergeRefs).toBeDefined();
      expect(typeof mergeRefs).toBe("function");
    });
  });

  describe("exports hooks", () => {
    it("should export useSetupFloating", () => {
      expect(useSetupFloating).toBeDefined();
      expect(typeof useSetupFloating).toBe("function");
    });

    it("should export useResizeObserver", () => {
      expect(useResizeObserver).toBeDefined();
      expect(typeof useResizeObserver).toBe("function");
    });

    it("should export useCalculateProgressCircle", () => {
      expect(useCalculateProgressCircle).toBeDefined();
      expect(typeof useCalculateProgressCircle).toBe("function");
    });
  });

  describe("exports providers, provider hooks and contexts", () => {
    it("should export NotificationsProvider", () => {
      expect(NotificationsProvider).toBeDefined();
    });

    it("should export useNotification", () => {
      expect(useNotification).toBeDefined();
      expect(typeof useNotification).toBe("function");
    });

    it("should export NotificationsContext", () => {
      expect(NotificationsContext).toBeDefined();
    });

    it("should export DialogsProvider", () => {
      expect(DialogsProvider).toBeDefined();
    });

    it("should export useDialogs", () => {
      expect(useDialogs).toBeDefined();
      expect(typeof useDialogs).toBe("function");
    });

    it("should export DialogsContext", () => {
      expect(DialogsContext).toBeDefined();
    });
  });

  describe("exports components", () => {
    it("should export Badge", () => {
      expect(Badge).toBeDefined();
    });

    it("should export Button", () => {
      expect(Button).toBeDefined();
    });

    it("should export Checkbox", () => {
      expect(Checkbox).toBeDefined();
    });

    it("should export Collapsible", () => {
      expect(Collapsible).toBeDefined();
    });

    it("should export Dialog", () => {
      expect(Dialog).toBeDefined();
    });

    it("should export Draggable", () => {
      expect(Draggable).toBeDefined();
    });

    it("should export IconButton", () => {
      expect(IconButton).toBeDefined();
    });

    it("should export Popover", () => {
      expect(Popover).toBeDefined();
    });

    it("should export Portal", () => {
      expect(Portal).toBeDefined();
    });

    it("should export ProgressCircle", () => {
      expect(ProgressCircle).toBeDefined();
    });

    it("should export Select", () => {
      expect(Select).toBeDefined();
    });

    it("should export Table", () => {
      expect(Table).toBeDefined();
    });

    it("should export Text", () => {
      expect(Text).toBeDefined();
    });

    it("should export TextField", () => {
      expect(TextField).toBeDefined();
    });

    it("should export Tooltip", () => {
      expect(Tooltip).toBeDefined();
    });
  });

});
