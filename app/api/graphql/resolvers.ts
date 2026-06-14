export const resolvers = {
  Query: {
    getDevices: () => [
      { entity_id: '1', state: 'unavailable', friendly_name: 'test' },
    ],
  },
};
