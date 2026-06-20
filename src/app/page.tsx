import { getDevices } from '@/lib/apollo/getDevices';

export default async function Home() {
  const { devices, error } = await getDevices();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-5">Статус устройств</h1>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          ⚠️ Ошибка загрузки: {error}
        </div>
      ) : (
        <pre className="bg-stone-100 p-4 rounded overflow-auto">
          {JSON.stringify(devices, null, 2)}
        </pre>
      )}
    </main>
  );
}
