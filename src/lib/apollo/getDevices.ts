import { GET_DEVICES } from '@/graphql/devices';
import { HAState } from '@/lib/graphql-server/types';
import { query } from './ApolloClient';

interface GetDevicesResponse {
  devices: HAState[];
  error: string | null;
}

export async function getDevices(): Promise<GetDevicesResponse> {
  try {
    const { data, error } = await query<{ devices: HAState[] }>({
      query: GET_DEVICES,
      errorPolicy: 'all',
    });
    if (error) {
      console.error('GraphQL schema errors: ', error);
      return { devices: data?.devices || [], error: error.message };
    }

    return { devices: data?.devices || [], error: null };
  } catch (err) {
    console.error('An error occures during the getting devices: ', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown network error';
    return { devices: [], error: errorMessage };
  }
}
