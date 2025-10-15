import type { AnyNode, Element } from "domhandler";
import type { SiteNav } from "../types";

export function site_nav(el: unknown): el is SiteNav {
  const siteNav = object(el) ? el : {};

  return (
    "name" in siteNav &&
    typeof siteNav?.name === "string" &&
    "url" in siteNav &&
    typeof siteNav?.url === "string" &&
    "parentID" in siteNav &&
    typeof siteNav?.parentID === "number" &&
    "recordID" in siteNav &&
    typeof siteNav?.recordID === "number" &&
    "sort" in siteNav &&
    typeof siteNav?.sort === "number" &&
    "knowledgeBaseID" in siteNav &&
    typeof siteNav?.knowledgeBaseID === "number" &&
    "recordType" in siteNav &&
    typeof siteNav?.recordType === "string"
  );
}

export function object(el: unknown): el is object {
  return typeof el === "object" && el !== null && !Array.isArray(el);
}

export function array(el: unknown): el is unknown[] {
  return typeof el === "object" && el !== null && Array.isArray(el);
}

export function element(el: AnyNode): el is Element {
  return object(el);
}
