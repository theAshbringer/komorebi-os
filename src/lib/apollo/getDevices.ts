import { GET_DEVICES } from '@/graphql/devices';
import { query } from './ApolloClient';
import { Device } from '@/types/device';

interface GetDevicesResponse {
  devices: Device[];
  error: string | null;
}

export async function getDevices(): Promise<GetDevicesResponse> {
  try {
    const { data, error } = await query<{ devices: Device[] }>({
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
