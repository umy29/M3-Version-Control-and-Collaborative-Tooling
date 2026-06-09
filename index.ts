import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./models/student.model";

// create student
const student: Student = {
  id: "STU-001",
  name: "Hana",
  enrollmentDate: Temporal.Now.instant(),
};

// readonly test (should error)
// student.id = "NEW-ID";

// optional test
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");

// type guard test
function processStudent(raw: unknown) {
  if (isStudent(raw)) {
    console.log(raw.name);
  } else {
    console.log("Invalid student");
  }
}

processStudent({ id: "1", name: "Hana" });
processStudent(42);

// parse test
console.log(parseStudent({ id: "STU-2", name: "Abebe" }));
// parseStudent({ id: 123, name: "Wrong" }); // should throw

import { AssessmentItem, calculateGrade } from "./models/assessment.model";

const quiz: AssessmentItem = {
  id: "Q1",
  kind: "quiz",
  title: "SQL",
  correctAnswers: 8,
  totalQuestions: 10,
};

const lab: AssessmentItem = {
  id: "L1",
  kind: "lab",
  title: "API",
  functionalityScore: 85,
  codeQualityScore: 90,
};

console.log(calculateGrade(quiz)); // 80
console.log(calculateGrade(lab)); // 87

import { renderResponse, ApiResponse } from "./models/api-response.model.js";

const res: ApiResponse<string> = {
  status: "success",
  data: "Hello",
  fetchedAt: Temporal.Now.instant(),
};

console.log(renderResponse(res, (d) => d));

const approvedAt = Temporal.Now.instant();
console.log(approvedAt);

const addis = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
console.log(addis.toPlainTime());

const today = Temporal.Now.plainDateISO();
const courseStart = Temporal.PlainDate.from("2026-09-01");

console.log(today.until(courseStart).total({ unit: "days" }));
