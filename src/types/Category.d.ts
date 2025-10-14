import type { CategoryListItem, Dataset } from ".";

export type Category = CategoryListItem & {
  datasets: Map<string, Dataset>;
};
