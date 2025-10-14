import * as cheerio from "cheerio";
import * as is_a from "../utils/is_a";
import get_header_action from "./get_header_action";
import list_header_actions from "./list_header_actions";

const SiteNavActionType = "@@navigation/GET_NAVIGATION_FLAT_DONE";

export default async function list_site_navs(url: string) {
  const $ = await cheerio.fromURL(url);

  // Fetch header actions
  const actions = list_header_actions($);

  // Fetch payload result for site nav action
  const result = get_header_action(actions, SiteNavActionType);

  // Extract only the site navs
  return result.filter((el) => is_a.site_nav(el));
}
