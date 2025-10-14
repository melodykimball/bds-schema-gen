import type { DatasetFieldType, DatasetVersion } from ".";

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
