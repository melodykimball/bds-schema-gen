import type { CategoryListItem } from "../types";
import list_site_navs from "./list_site_navs";

const AboutBdsUri = "https://community.d2l.com/brightspace/kb/articles/4518-about-brightspace-data-sets";
const SiteNavBdsParentName = "Brightspace Data Sets";

export default async function list_categories() {
  const siteNavs = await list_site_navs(AboutBdsUri);

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
