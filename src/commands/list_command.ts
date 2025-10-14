import fetch_category_list from "../api/fetch_category_list.js";

export default async function list_command() {
  const categories = await fetch_category_list();

  for (const category of categories) {
    console.log(category.name);
  }
}
