import { DeviceCard } from '@/components/devices/DeviceCard/DeviceCard';
import { getDevices } from '@/lib/apollo/getDevices';

export default async function Home() {
  const { devices, error } = await getDevices();

  return (
    <main className="p-10">
      <h1 className="mb-5 text-2xl font-bold">Статус устройств</h1>
      <div className="mb-3 flex gap-2">
        <DeviceCard name="Лампочка" type="light" state="on" />
        <DeviceCard name="Выключатель" type="switch" state="on" />
        <DeviceCard name="Кнопка" type="button" state="off" />
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 text-red-600">
          ⚠️ Ошибка загрузки: {error}
        </div>
      ) : (
        <pre className="overflow-auto rounded bg-stone-100 p-4">
          {JSON.stringify(devices, null, 2)}
        </pre>
      )}
    </main>
  );
}
