import type { CheerioAPI, Cheerio } from "cheerio";
import type { Element } from "domhandler";

export function text(el: Cheerio<Element>) {
  return el
    .text()
    .trim()
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/[\x20]{2,}/g, " ");
}

export function* rows($: CheerioAPI, table: Cheerio<Element>) {
  const thead = [];
  for (const th of elements($, table.find("thead th"))) {
    thead.push(text(th));
  }

  for (const tr of elements($, table.find("tbody tr"))) {
    const row = new Map<string, string>();
    let col = -1;
    for (const td of elements($, tr.find("td"))) {
      if (++col < thead.length) {
        row.set(thead[col], text(td));
      }
    }

    yield row;
  }
}

export function* elements($: CheerioAPI, elements: Cheerio<Element>) {
  for (const el of elements) {
    yield $(el);
  }
}
