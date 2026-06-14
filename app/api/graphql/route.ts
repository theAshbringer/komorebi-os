import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';

const resolvers = {
  Query: {
    getDevices: () => [
      { entity_id: '1', state: 'unavailable', friendly_name: 'test' },
    ],
  },
};

const typeDefs = gql`
  type Device {
    entity_id: String!
    state: String!
    friendly_name: String!
  }

  type Query {
    getDevices: [Device!]!
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
