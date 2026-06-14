export interface HAStateRaw {
  entity_id: string;
  state: string;
  last_changed: string;
  attributes: Record<string, any>;
}
