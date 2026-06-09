import { Temporal } from "@js-temporal/polyfill";
export interface Student {
  readonly id: string;
  name: string;
  enrollmentDate: Temporal.Instant;
  gpa?: number; // Optional undefined until the student receives a grade
}

export function isStudent(value: unknown): value is Student {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as Record<string, unknown>).id === "string" &&
    typeof (value as Record<string, unknown>).name === "string"
  );
}

export function parseStudent(raw: unknown): Student {
  if (typeof raw !== "object" || raw === null) {
    throw new TypeError("Expected object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.id !== "string") {
    throw new TypeError("id must be string");
  }

  if (typeof obj.name !== "string") {
    throw new TypeError("name must be string");
  }

  return {
    id: obj.id,
    name: obj.name,
    enrollmentDate: Temporal.Now.instant(),
  };
}
