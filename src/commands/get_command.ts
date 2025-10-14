import fetch_category from "../api/fetch_category";
import fetch_category_list from "../api/fetch_category_list";

export default async function get_command(categoryName?: string | undefined) {
  const categories = await fetch_category_list();

  const selected = categories.filter((c) => categoryName === undefined || categoryName === c.name);

  const result = await Promise.all(selected.map((c) => fetch_category(c)));

  console.log(JSON.stringify(result, json_replacer, 2));
}

function json_replacer(key: unknown, value: unknown) {
  return value instanceof Map ? Object.fromEntries(value) : value;
}
