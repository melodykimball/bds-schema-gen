import type { Category, CategoryListItem } from "../types";
import * as dataset from "./dataset";
import * as sitenav from "./sitenav";

const AboutBdsUri = "https://community.d2l.com/brightspace/kb/articles/4518-about-brightspace-data-sets";
const SiteNavBdsParentName = "Brightspace Data Sets";

export async function list() {
  const siteNavs = await sitenav.list(AboutBdsUri);

  // Get the site nav ID for the parent of all the BDS page links
  const parentID = siteNavs.find((el) => el.name === SiteNavBdsParentName)?.recordID ?? -99;

  // Remap site navs into category items
  return siteNavs
    .filter((el) => el.parentID === parentID && el.recordType === "article")
    .map(
      (el) =>
        ({
          name: el.name.replace(" data sets", ""),
          url: el.url,
        } as CategoryListItem)
    );
}

export async function get(category: CategoryListItem) {
  const datasets = await dataset.list(category);

  return {
    ...category,
    datasets,
  } as Category;
}
