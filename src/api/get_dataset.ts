import type { CategoryListItem } from "../types";
import list_datasets from "./list_datasets";

export default async function get_dataset(category: CategoryListItem, name: string) {
  const datasets = await list_datasets(category);
  return datasets.get(name);
}
