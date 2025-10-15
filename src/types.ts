export type { Cheerio, CheerioAPI } from "cheerio";
export type { Element } from "domhandler";

/**
 * Brightspace Data Set reference tables are organized by category (such as Assignments data sets). Each category page
 * includes an Entity Relationship Diagram (ERD) that graphically displays the types of relationships (one-to-one,
 * one-to-many, etc.) between all entities, including which fields are Primary Keys (PKs) and Foreign Keys (FKs), and
 * which fields can be null.
 */
export type CategoryListItem = {
  name: string;
  url: string;
};

export type Category = CategoryListItem & {
  datasets: Map<string, Dataset>;
};

export type Dataset = {
  name: string;
  url?: string;
  description: string;
  keys: string[];
  fields: DatasetField[];
};

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

/**
 * Brightspace Data Set fields are described using MS SQL Server data types.
 *
 * @see https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql
 */
export const DatasetFieldTypes = [
  // Integers
  "bigint", // Range: [-(2^63), +(2^63 - 1)]
  "int", // Range: [-(2^31), +(2^31 - 1)]
  "smallint", // Range: [-(2^15), +(2^15 - 1)]
  "tinyint", // Range: [0, +(2^8 - 1)]
  "bit", // Range: [0, 1]

  // Fixed precision and scale numbers. `decimal` and `numeric` are the same.
  "decimal",
  "numeric",

  // Floating-point numbers. `real` is `float(24)`
  "float",
  "real",

  // Date and time
  "date",
  "time",
  "datetime",
  "datetime2",

  // Character strings
  "char",
  "varchar",
  "text",

  // Unicode strings
  "nchar",
  "nvarchar",
  "ntext",

  // Binary strings
  "binary",
  "varbinary",
  "image",

  // Other
  "uniqueidentifier",
  "xml",
  "sql_variant",
  "table",
  "hierarchyid",
  "geography",
  "geometry",
] as const;

export type DatasetFieldType = string & (typeof DatasetFieldTypes)[number];

/**
 * To keep track of changes in Brightspace Platform releases, Brightspace Data Sets (BDS) have their own version
 * number. This version number updates every month as a part of the Continuous Delivery (CD) software update.
 *
 * When the BDS version number changes, any updates will appear in the data the next time the BDS are
 * generated. Specific changes to individual BDS are captured in their respective reference tables. Each reference
 * table displays the BDS version number for each change under Version History.
 *
 * @see https://community.d2l.com/brightspace/kb/articles/4518-about-brightspace-data-sets-versions
 */
export type DatasetVersion = {
  id: string;
  description: string;
};

/**
 * Represents items in the right-hand navigation panel on the D2L Brightspace knowledge base.
 */
export type SiteNav = {
  name: string;
  url: string;
  parentID: number;
  recordID: number;
  sort: number;
  knowledgeBaseID: number;
  recordType: string & ("knowledgeCategory" | "article");
};
