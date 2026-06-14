import { fetchHAStates } from '@/lib/ha/fetcher';
import { HAState } from './types';
import { isNeededDeviceType } from './utils/devices/isNeededDeviceType';
export const resolvers = {
  Query: {
    devices: async (): Promise<HAState[]> => {
      const states = await fetchHAStates();
      return states
        .filter((state) => isNeededDeviceType(state.entity_id))
        .map((state) => ({
          entityId: state.entity_id,
          state: state.state,
          friendlyName: state.attributes?.friendly_name || state.entity_id,
        }));
    },
  },
};
