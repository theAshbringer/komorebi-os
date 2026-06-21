import { DeviceType } from '@/types/device';
import { GamepadDirectional, Lightbulb, ToggleRight } from 'lucide-react';

interface DeviceIconProps {
  type: DeviceType;
  className?: string;
}

export function DeviceIcon({ type, className }: DeviceIconProps) {
  switch (type) {
    case 'button':
      return <GamepadDirectional className={className} />;
    case 'light':
      return <Lightbulb className={className} />;
    case 'switch':
      return <ToggleRight className={className} />;
  }
}
