import type { CategoryListItem } from "./CategoryListItem";
import type { Dataset } from "./Dataset";

export type Category = CategoryListItem & {
  datasets: Map<string, Dataset>;
};
