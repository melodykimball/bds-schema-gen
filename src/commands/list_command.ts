import fetch_category_list from "../api/category_list.js";

export default async function list_command() {
  const categories = await fetch_category_list();

  for (const [categoryName] of categories) {
    console.log(categoryName);
  }
}
