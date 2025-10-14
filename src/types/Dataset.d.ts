import type { DatasetField } from ".";

export type Dataset = {
  name: string;
  description: string;
  keys: string[];
  fields: DatasetField[];
};
