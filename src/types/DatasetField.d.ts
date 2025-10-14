import type { DatasetFieldType } from "./DatasetFieldType";
import type { DatasetVersion } from "./DatasetVersion";

export type DatasetField = {
  version: DatasetVersion;
  name: string;
  description: string;
  type: DatasetFieldType;
  format: number | string;
  isPrimary: boolean;
  isForeign: boolean;
  canBeNull: boolean;
};
