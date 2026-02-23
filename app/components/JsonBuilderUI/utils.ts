import { Field } from "./types";

export const createField = (): Field => ({
  id: crypto.randomUUID(),
  key: "",
  type: "string",
  value: "",
  children: [],
});

export const buildJSON = (fields: Field[]): any => {
  const obj: any = {};

  fields.forEach((field) => {
    if (!field.key) return;

    if (field.type === "object") {
      obj[field.key] = buildJSON(field.children || []);
    } else if (field.type === "number") {
      obj[field.key] = Number(field.value);
    } else if (field.type === "boolean") {
      obj[field.key] = field.value === "true";
    } else {
      obj[field.key] = field.value;
    }
  });

  return obj;
};