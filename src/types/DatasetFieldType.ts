/**
 * Brightspace Data Set fields are documented using SQL Server data types.
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
