import "@testing-library/jest-dom/vitest";
import { MotionGlobalConfig } from "framer-motion";
import  resizeObserverPolyfill from "resize-observer-polyfill";

MotionGlobalConfig.skipAnimations = true;

global.ResizeObserver = resizeObserverPolyfill;
