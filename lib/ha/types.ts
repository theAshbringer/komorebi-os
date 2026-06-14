export interface HAStateRaw {
  entity_id: string;
  state: HAStateState;
  attributes: HAStateAttributesRaw;
  last_changed: string;
  last_reported: string;
  last_updated: string;
  context: HAStateContextRaw;
  domain?: string;
  object_id?: string;
  name?: string;
}

export type HAStateAttributesRaw =
  | {
      id?: string;
      auto_update?: boolean;
      assumed_state?: boolean;
      entity_picture?: string;
      unit_of_measurement?: string;
      restored?: boolean;
      display_precision?: number;
      installed_version?: string;
      in_progress?: boolean;
      latest_version?: string;
      release_summary?: any | null;
      release_url?: string;
      skipped_version?: any | null;
      title?: string;
      attribution?: string;
      device_class?: string;
      update_percentage?: number | null;
      icon?: string;
      friendly_name?: string;
      supported_features?: any;
    }
  | Record<string, any>;

export interface HAStateContextRaw {
  id: string;
  user_id: string | null;
  parent_id: string | null;
}

export type HAStateState = 'on' | 'off' | 'unavailable' | 'unknown';
