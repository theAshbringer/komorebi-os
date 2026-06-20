import { env } from '@/lib/env';
import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri:
        `${env.NEXT_PUBLIC_HOST_URL}/api/graphql` ||
        'http://localhost:3000/api/graphql',
      fetchOptions: {},
    }),
  });
});
