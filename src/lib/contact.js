import { projectTypes, budgetRanges } from "../../data/contact.js";
import { readyEntries } from "./content.js";

export const briefFields = [["name", "email"], ["projectType", "budget"], ["message"]];

export function validateContact(values, step) {
  const errors = {};
  if (!values || typeof values !== "object" || Array.isArray(values)) return { message: "Please enter your details." };
  for (const [field, max] of [["name", 100], ["email", 254], ["message", 5000]]) {
    if (typeof values[field] !== "string" || !values[field].trim()) errors[field] = "Please enter your " + field + ".";
    else if (values[field].length > max) errors[field] = "Please use at most " + max + " characters.";
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!readyEntries(projectTypes, "Project types").includes(values.projectType)) errors.projectType = "Please choose a project type.";
  const ranges = readyEntries(budgetRanges, "Budget ranges");
  if (values.budget != null && (typeof values.budget !== "string" || values.budget.length > 100 || values.budget.includes("[FILL"))) errors.budget = "Please enter a budget of at most 100 characters.";
  else if (ranges.length && values.budget && !ranges.includes(values.budget)) errors.budget = "Please choose a listed budget range.";
  return step === undefined ? errors : Object.fromEntries(Object.entries(errors).filter(([field]) => briefFields[step].includes(field)));
}
