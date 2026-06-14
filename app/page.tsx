import { fetchHAStates } from '@/lib/ha/fetcher';

export default async function Home() {
  const HAStateData = await fetchHAStates();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-5">Статус устройств</h1>
      <pre className={` bg-stone-100 p-4 rounded overflow-auto`}>
        {JSON.stringify(HAStateData, null, 2)}
      </pre>
    </main>
  );
}
