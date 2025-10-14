import { Command } from "commander";
import list_command from "./commands/list_command.js";
import get_command from "./commands/get_command.js";

export default function app() {
  const app = new Command();

  app.command("list").description("Lists available BDS categories").action(list_command);

  app.command("get [categoryName]").description("Get schema for specified category").action(get_command);

  return app;
}
