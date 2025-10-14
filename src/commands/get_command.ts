import get_category from "../api/get_category";
import list_categories from "../api/list_categories";

export default async function get_command(categoryName?: string | undefined) {
  const categories = await list_categories();

  const selected = categories.filter((c) => categoryName === undefined || categoryName === c.name);

  const result = await Promise.all(selected.map((c) => get_category(c)));

  console.log(JSON.stringify(result, json_replacer, 2));
}

function json_replacer(key: unknown, value: unknown) {
  return value instanceof Map ? Object.fromEntries(value) : value;
}
