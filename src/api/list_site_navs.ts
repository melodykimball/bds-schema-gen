import * as cheerio from "cheerio";
import * as is_a from "../utils/is_a";

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

function list_header_actions($: cheerio.CheerioAPI) {
  // Find the first <script> element in <head> and execute it
  const script = $("head > script:first").text();
  const actions = new Function(`"use strict"; const window = {}; ${script}; return window?.__ACTIONS__;`)();

  // Return all the objects in the headerActions array
  return is_a.array(actions) ? actions.filter(is_a.object) : [];
}

function get_header_action(actions: object[], type: string) {
  // Find the specified action and extract payload.result
  const action = actions.find((el) => "type" in el && el.type === type) ?? {};
  const payload = "payload" in action && is_a.object(action.payload) ? action.payload : {};
  return "result" in payload && is_a.array(payload.result) ? payload.result.filter((el) => is_a.object(el)) : [];
}
