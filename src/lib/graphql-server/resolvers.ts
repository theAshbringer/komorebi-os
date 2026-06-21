import { fetchHAStates } from '@/lib/ha/fetcher';
import { HAStateState } from '@/lib/ha/types';
import {
  getNeededDeviceType,
  NeededDeviceType,
} from './utils/devices/getNeededDeviceType';

interface DevicesResponse {
  entityId: string;
  state: HAStateState;
  friendlyName: string;
  deviceType: NeededDeviceType;
}

export const resolvers = {
  Query: {
    devices: async (): Promise<DevicesResponse[]> => {
      const states = await fetchHAStates();
      return states.flatMap((state) => {
        const deviceType = getNeededDeviceType(state.entity_id);

        if (!deviceType) return [];

        return [
          {
            entityId: state.entity_id,
            state: state.state,
            friendlyName: state.attributes?.friendly_name || state.entity_id,
            deviceType,
          },
        ];
      });
    },
  },
};
