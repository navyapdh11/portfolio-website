// AASTACLEAN — Vitest Accessibility Test Setup
// Uses axe-core to verify WCAG 2.2 AA compliance

import { expect } from "vitest";
import { toHaveNoViolations } from "vitest-axe";

expect.extend(toHaveNoViolations);
