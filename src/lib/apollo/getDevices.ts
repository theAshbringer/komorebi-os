import { GET_DEVICES } from '@/graphql/devices';
import { HAState } from '@/lib/graphql-server/types';
import { query } from './ApolloClient';

export async function getDevices(): Promise<HAState[] | null> {
  try {
    const { data, error } = await query<{ devices: HAState[] }>({
      query: GET_DEVICES,
      errorPolicy: 'all',
    });
    if (error) {
      console.error('GraphQL schema errors: ', error);
    }

    return data?.devices || [];
  } catch (err) {
    console.error('An error occures during the getting devices: ', err);
    return null;
  }
}
