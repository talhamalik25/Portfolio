export function validateContact(values) {
  const errors = {};
  if (!values || typeof values !== "object" || Array.isArray(values)) return { message: "Please enter your details." };
  for (const [field, max] of [["name", 100], ["email", 254], ["message", 5000]]) {
    if (typeof values[field] !== "string" || !values[field].trim()) errors[field] = "Please enter your " + field + ".";
    else if (values[field].length > max) errors[field] = "Please use at most " + max + " characters.";
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  return errors;
}
