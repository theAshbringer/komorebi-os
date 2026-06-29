import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { DeviceState, DeviceType } from '@/types/device';
import { DeviceIcon } from './DeviceIcon';
interface DeviceCardProps {
  name: string;
  type: DeviceType;
  state: DeviceState;
}

export function DeviceCard({ name, type, state }: DeviceCardProps) {
  const room = 'Гостиная';
  const isOn = state === 'on';
  const isOffline = state === 'unknown' || state === 'unavailable';
  return (
    <Card
      size="sm"
      className={cn(
        '@container h-46 w-42 p-4 shadow-lg/20',
        isOffline && 'opacity-50'
      )}
    >
      <div className="flex justify-between">
        <div
          className={cn(
            'bg-muted shadow-primary/30 flex size-[38cqw] shrink-0 items-center justify-center rounded-full',
            isOn && 'shadow-md'
          )}
        >
          <DeviceIcon type={type} className="text-primary size-[64%]" />
        </div>
        <Switch checked={isOn}></Switch>
      </div>
      <div className="mt-auto">
        <h3 className="truncate text-[clamp(1.1rem,13cqw,1.4rem)] font-bold">
          {name}
        </h3>
        <p className="text-primary text-[10cqw]">
          <span className="text-primary text-[10cqw] font-semibold">
            {room}
          </span>{' '}
          {isOffline && <span>| Офлайн</span>}
        </p>
      </div>
    </Card>
  );
}
