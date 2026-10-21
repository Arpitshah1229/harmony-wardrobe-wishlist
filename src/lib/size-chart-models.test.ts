import { expect, test } from "bun:test";
import { SIZE_CHART_MODELS } from "./size-chart-models";

test("first model wears medium and is 5 feet 11 inches tall", () => {
  expect(SIZE_CHART_MODELS[0].size).toBe("M");
  expect(SIZE_CHART_MODELS[0].height).toBe("5’11”");
});

test("second model wears small and is 5 feet 8 inches tall", () => {
  expect(SIZE_CHART_MODELS[1].size).toBe("S");
  expect(SIZE_CHART_MODELS[1].height).toBe("5’8”");
});