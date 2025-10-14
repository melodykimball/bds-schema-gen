import list_categories from "../api/list_categories";

export default async function list_command() {
  const categories = await list_categories();

  for (const category of categories) {
    console.log(category.name);
  }
}
