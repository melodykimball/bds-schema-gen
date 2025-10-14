import * as is_a from "../utils/is_a";

export default function get_header_action(actions: object[], type: string) {
  // Find the specified action and extract payload.result
  const action = actions.find((el) => "type" in el && el.type === type) ?? {};
  const payload = "payload" in action && is_a.object(action.payload) ? action.payload : {};
  return "result" in payload && is_a.array(payload.result) ? payload.result.filter((el) => is_a.object(el)) : [];
}
