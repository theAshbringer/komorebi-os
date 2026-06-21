import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeviceState, DeviceType } from '@/types/device';
import { DeviceIcon } from './DeviceIcon';
interface DeviceCardProps {
  name: string;
  type: DeviceType;
  state: DeviceState;
}

export function DeviceCard({ name, type, state }: DeviceCardProps) {
  return (
    <>
      <Card size="sm">
        <CardHeader>
          <DeviceIcon type={type} />
          <CardTitle>{name}</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
          <CardAction>Toggle</CardAction>
        </CardHeader>
        <CardContent>
          <p>Состояние: {state}</p>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  );
}
