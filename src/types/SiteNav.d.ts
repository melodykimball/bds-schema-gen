export type SiteNav = {
  name: string;
  url: string;
  parentID: number;
  recordID: number;
  sort: number;
  knowledgeBaseID: number;
  recordType: string & ("knowledgeCategory" | "article");
};
