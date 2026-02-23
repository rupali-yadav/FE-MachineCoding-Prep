export type FieldType = "string" | "number" | "boolean" | "object";

export type Field = {
  id: string;
  key: string;
  type: FieldType;
  value?: string;
  children?: Field[];
};