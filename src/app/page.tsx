import { GET_DEVICES } from '@/graphql/devices';
import { query } from '@/lib/apollo/ApolloClient';

export default async function Home() {
  let devices;
  try {
    const { data, error } = await query({
      query: GET_DEVICES,
      errorPolicy: 'all',
    });
    devices = data;
    if (error) {
      console.error('GraphQL schema errors: ', error);
    }
  } catch (err) {
    devices = undefined;
    console.error('An error occures during the getting devices: ', err);
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-5">Статус устройств</h1>
      <pre className={` bg-stone-100 p-4 rounded overflow-auto`}>
        {JSON.stringify(devices, null, 2)}
      </pre>
    </main>
  );
}
