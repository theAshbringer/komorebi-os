import { env } from 'process';
import { HAStateRaw } from './types';

export async function fetchHAStates(): Promise<HAStateRaw[]> {
  const url = env.HA_URL;
  const token = env.HA_TOKEN;

  if (!url || !token) {
    throw new Error('Home Assistant URL or token is missing in .env');
  }

  try {
    const res = await fetch(`${url}/api/states`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HA API Error: ${res.status} - ${res.statusText}`);
    }

    const data: HAStateRaw[] = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Home Assistant states: ', error);
    throw error;
  }
}
