import { DeviceType } from '@/types/device';
import {
  GamepadDirectional,
  Lightbulb,
  LucideProps,
  ToggleRight,
} from 'lucide-react';

interface DeviceIconProps extends LucideProps {
  type: DeviceType;
  className?: string;
}

export function DeviceIcon({
  type,
  className,
  ...otherProps
}: DeviceIconProps) {
  switch (type) {
    case 'button':
      return <GamepadDirectional {...otherProps} className={className} />;
    case 'light':
      return <Lightbulb {...otherProps} className={className} />;
    case 'switch':
      return <ToggleRight {...otherProps} className={className} />;
  }
}
