export const resolvers = {
  Query: {
    devices: () => [
      { entity_id: '1', state: 'unavailable', friendly_name: 'test' },
    ],
  },
};
