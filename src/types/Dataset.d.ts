import type { DatasetField } from "./DatasetField";

export type Dataset = {
  name: string;
  description: string;
  keys: string[];
  fields: DatasetField[];
};
