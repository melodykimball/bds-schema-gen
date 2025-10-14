import * as cheerio from "cheerio";
import * as is_a from "../utils/is_a";

export default function list_header_actions($: cheerio.CheerioAPI) {
  // Find the first <script> element in <head> and execute it
  const script = $("head > script:first").text();
  const actions = new Function(`"use strict"; const window = {}; ${script}; return window?.__ACTIONS__;`)();

  // Return all the objects in the headerActions array
  return is_a.array(actions) ? actions.filter(is_a.object) : [];
}
