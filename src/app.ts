import { Command } from "commander";
import * as category from "./api/category";
import * as JSON from "./utils/json";

export function main(argv?: readonly string[] | undefined) {
  create_app().parse(argv);
}

export function create_app() {
  const app = new Command();

  app.command("list").description("Lists available BDS categories").action(list_categories);

  app.command("get [categoryName]").description("Get schema for specified category").action(get_category);

  return app;
}

export async function list_categories() {
  const categories = await category.list();

  for (const category of categories) {
    console.log(category.name);
  }
}

export async function get_category(categoryName?: string | undefined) {
  const categories = await category.list();

  const selected = categories.filter((c) => categoryName === undefined || categoryName === c.name);

  const result = await Promise.all(selected.map((c) => category.get(c)));

  console.log(JSON.stringify(result));
}
