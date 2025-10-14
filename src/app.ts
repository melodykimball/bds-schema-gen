import { Command } from "commander";

export default function app() {
  const app = new Command();

  app.command("list").description("Lists available BDS categories").action(list_command);

  app.command("get [categoryName]").description("Get schema for specified category").action(get_command);

  return app;
}

async function list_command() {
  console.log("Not implemented");
}

async function get_command(categoryName?: string | undefined) {
  console.log("Not implemented");
}
