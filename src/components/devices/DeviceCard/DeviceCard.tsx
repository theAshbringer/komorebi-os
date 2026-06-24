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
        <div className="bg-muted flex size-[38cqw] shrink-0 items-center justify-center rounded-full">
          <DeviceIcon type={type} className="text-primary size-[64%]" />
        </div>
        <Switch></Switch>
      </div>
      <div className="mt-auto">
        <h3 className="truncate text-[clamp(1.1rem,13cqw,1.4rem)] font-bold">
          {name}
        </h3>
        {state === 'on' && (
          <p className="text-primary text-[10cqw] font-semibold">Включено</p>
        )}
        <p className="text-muted-foreground text-[9cqw] font-medium">{room}</p>
      </div>
    </Card>
  );
}
