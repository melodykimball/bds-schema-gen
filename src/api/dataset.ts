import * as cheerio from "cheerio";
import {
  type CategoryListItem,
  type Cheerio,
  type CheerioAPI,
  type Dataset,
  type DatasetField,
  type DatasetFieldType,
  DatasetFieldTypes,
  type DatasetVersion,
  type Element,
} from "../types";
import * as cheerUtil from "../utils/cheerio";
import * as is_a from "../utils/is_a";

export async function list(category: CategoryListItem) {
  const $ = await get_page(category.url);

  const headers = $("div.mainColumn article").children("h2");

  const datasets = new Map<string, Dataset>();

  for (const header of cheerUtil.elements($, headers)) {
    const dataset = get_dataset($, header);
    if (dataset.fields.length > 0) {
      if (dataset.url) {
        dataset.url = `${category.url}#${dataset.url}`;
      }
      datasets.set(dataset.name, dataset);
    }
  }

  return datasets;
}

export async function get(category: CategoryListItem, name: string) {
  const datasets = await list(category);
  return datasets.get(name);
}

async function get_page(url: string) {
  const $ = await cheerio.fromURL(url);

  const fallbackPageContent = $("noscript#fallbackPageContent").html() ?? "";

  return cheerio.load(fallbackPageContent);
}

function get_dataset($: CheerioAPI, header: Cheerio<Element>) {
  const id = header.data('id');
  const name = cheerUtil.text(header);
  const descriptions: string[] = [];
  const fields: DatasetField[] = [];

  const siblings = header.nextUntil("h2");
  for (const el of cheerUtil.elements($, siblings)) {
    if (el.is("table")) {
      if (fields.length === 0) {
        fields.push(...get_fields($, el));
      }
    } else {
      const description = cheerUtil.text(el);
      if (description.length > 0) {
        descriptions.push(description);
      }
    }
  }

  return {
    name,
    url: typeof id === "string" ? id : undefined,
    description: descriptions.join(" ").trim(),
    keys: fields.filter((f) => f.isPrimary).map((f) => f.name),
    fields,
  } as Dataset;
}

function get_fields($: CheerioAPI, table: Cheerio<Element>) {
  const fields: DatasetField[] = [];

  for (const row of cheerUtil.rows($, table)) {
    const version = get_version(row.get("Version History") ?? "");
    const name = row.get("Field");
    const type = get_field_type(row.get("Type") ?? "");
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

function get_version(versionHistory: string) {
  const matches = versionHistory?.match(/^([0-9]+\.[0-9]+)(?:[ ]*\/[ ]*([0-9]+\.[0-9]+))?(?:[ ]*-[ ]*(.*))?/) ?? null;
  return matches
    ? ({
        id: matches[2] ?? matches[1] ?? "",
        description: matches[3] ?? "",
      } as DatasetVersion)
    : undefined;
}

function get_field_type(el: string): DatasetFieldType | undefined {
  const fieldType = DatasetFieldTypes.find((t) => t === el);
  return fieldType ? (fieldType as DatasetFieldType) : undefined;
}
