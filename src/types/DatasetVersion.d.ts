/**
 * To keep track of changes in Brightspace Platform releases, Brightspace Data
 * Sets (BDS) have their own version number. This version number updates every
 * month as a part of the Continuous Delivery (CD) software update.
 *
 * When the BDS version number changes, any updates will appear in the data the
 * next time the BDS are generated. Specific changes to individual BDS are
 * captured in their respective reference tables. Each reference table displays
 * the BDS version number for each change under Version History.
 *
 * @see https://community.d2l.com/brightspace/kb/articles/4518-about-brightspace-data-sets-versions
 */
export type DatasetVersion = {
  id: string;
  description: string;
};
