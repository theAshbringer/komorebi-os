import { fetchHAStates } from '@/lib/ha/fetcher';
import { HAState } from './types';
export const resolvers = {
  Query: {
    devices: async (): Promise<HAState[]> => {
      const states = await fetchHAStates();
      return states.map((state) => ({
        entityId: state.entity_id,
        state: state.state,
        friendlyName: state.attributes.friendly_name || state.entity_id,
      }));
    },
  },
};
