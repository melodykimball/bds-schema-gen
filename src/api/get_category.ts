import { Category } from "../types/Category";
import { CategoryListItem } from "../types/CategoryListItem";

export default async function get_category(category: CategoryListItem) {
  return {
    ...category,
    datasets: new Map(),
  } as Category;
}
