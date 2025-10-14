import type { Category, CategoryListItem } from "../types";
import list_datasets from "./list_datasets";

export default async function get_category(category: CategoryListItem) {
  const datasets = await list_datasets(category);

  return {
    ...category,
    datasets,
  } as Category;
}
