import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { DeviceState, DeviceType } from '@/types/device';
import { DeviceIcon } from './DeviceIcon';
interface DeviceCardProps {
  name: string;
  type: DeviceType;
  state: DeviceState;
}

export function DeviceCard({ name, type, state }: DeviceCardProps) {
  const room = 'Гостиная';
  return (
    <Card size="sm" className="@container h-46 w-42 p-4 shadow-lg/20">
      <div className="flex justify-between">
        <div className="flex size-[38cqw] shrink-0 items-center justify-center rounded-full bg-gray-200">
          <DeviceIcon
            color="oklch(55.3% 0.013 58.071)"
            type={type}
            className="size-[64%]"
          />
        </div>
        <Switch></Switch>
      </div>
      <div className="mt-auto">
        <h3 className="text-[13cqw] font-bold">{name}</h3>
        {state === 'on' && (
          <p className="text-[11cqw] font-semibold text-stone-500">Включено</p>
        )}
        <p className="text-[9cqw] text-stone-400">{room}</p>
      </div>
    </Card>
  );
}
