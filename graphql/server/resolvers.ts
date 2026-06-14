import { fetchHAStates } from '@/lib/ha/fetcher';
import { HAState } from './types';
export const resolvers = {
  Query: {
    devices: async (): Promise<HAState[]> => {
      const states = await fetchHAStates();
      const deviceTypes = ['sensor', 'switch', 'light', 'button'];
      return states
        .filter((state) => deviceTypes.includes(state.entity_id.split('.')[0]))
        .map((state) => ({
          entityId: state.entity_id,
          state: state.state,
          friendlyName: state.attributes.friendly_name || state.entity_id,
        }));
    },
  },
};
