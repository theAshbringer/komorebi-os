export type DeviceType = 'switch' | 'light' | 'button';

export type DeviceState = 'on' | 'off' | 'unavailable' | 'unknown';

export interface Device {
  entityId: string;
  state: DeviceState;
  deviceType: DeviceType;
  friendlyName: string;
}
