export function parse(value: string) {
  return JSON.parse(value);
}

export function stringify(value: unknown) {
  return JSON.stringify(value, json_replacer, 2);
}

function json_replacer(key: unknown, value: unknown) {
  return value instanceof Map ? Object.fromEntries(value) : value;
}
