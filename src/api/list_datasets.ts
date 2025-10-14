import * as cheerio from "cheerio";
import type {
  CategoryListItem,
  Cheerio,
  CheerioAPI,
  Dataset,
  DatasetField,
  DatasetFieldType,
  DatasetVersion,
  Element,
} from "../types";
import { DatasetFieldTypes } from "../types/DatasetFieldType";
import { text, elements, rows } from "../utils/cheerio";

export default async function list_datasets(category: CategoryListItem) {
  const $ = await get_category_page(category.url);

  const headers = $("div.mainColumn article").children("h2");

  const datasets = new Map<string, Dataset>();

  for (const header of elements($, headers)) {
    const dataset = get_category_dataset($, header);
    if (dataset.fields.length > 0) {
      datasets.set(dataset.name, dataset);
    }
  }

  return datasets;
}

async function get_category_page(url: string) {
  const $ = await cheerio.fromURL(url);

  const fallbackPageContent = $("noscript#fallbackPageContent").html() ?? "";

  return cheerio.load(fallbackPageContent);
}

function get_category_dataset($: CheerioAPI, header: Cheerio<Element>) {
  const name = text(header);
  const descriptions: string[] = [];
  const fields: DatasetField[] = [];

  const siblings = header.nextUntil("h2");
  for (const el of elements($, siblings)) {
    if (el.is("table")) {
      if (fields.length === 0) {
        fields.push(...get_dataset_fields($, el));
      }
    } else {
      const description = text(el);
      if (description.length > 0) {
        descriptions.push(description);
      }
    }
  }

  return {
    name: name,
    description: descriptions.join(" ").trim(),
    keys: fields.filter((f) => f.isPrimary).map((f) => f.name),
    fields: fields,
  } as Dataset;
}

function get_dataset_fields($: CheerioAPI, table: Cheerio<Element>) {
  const fields: DatasetField[] = [];

  for (const row of rows($, table)) {
    const version = get_dataset_version(row.get("Version History") ?? "");
    const name = row.get("Field");
    const type = get_dataset_field_type(row.get("Type") ?? "");
    const description = row.get("Description") ?? "";
    const key = row.get("Key") ?? "";

    if (version && name && type) {
      fields.push({
        version,
        name,
        description,
        type,
        format: row.get("Size") ?? "",
        isPrimary: key.includes("PK"),
        isForeign: key.includes("FK"),
        canBeNull: description.includes("can be null"),
      });
    }
  }

  return fields;
}

function get_dataset_version(versionHistory: string) {
  const matches = versionHistory?.match(/^([0-9]+\.[0-9]+)(?:[ ]*\/[ ]*([0-9]+\.[0-9]+))?(?:[ ]*-[ ]*(.*))?/) ?? null;
  return matches
    ? ({
        id: matches[2] ?? matches[1] ?? "",
        description: matches[3] ?? "",
      } as DatasetVersion)
    : undefined;
}

function get_dataset_field_type(el: string): DatasetFieldType | undefined {
  const fieldType = DatasetFieldTypes.find((t) => t === el);
  return fieldType ? (fieldType as DatasetFieldType) : undefined;
}
