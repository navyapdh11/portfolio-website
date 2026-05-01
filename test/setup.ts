// AASTACLEAN — Vitest Accessibility Test Setup
// Uses axe-core to verify WCAG 2.2 AA compliance
import { toHaveNoViolations } from "vitest-axe";
import { expect } from "vitest";

expect.extend(toHaveNoViolations);
