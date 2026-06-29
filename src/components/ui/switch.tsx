'use client';

import { Switch as SwitchPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-[3px] aria-invalid:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50',

        // 1. Добавляем фиксированный паддинг для всего свитча
        'p-1',

        // 2. Меняем старые кривые размеры на чистые пропорциональные сетки
        'data-[size=default]:h-6 data-[size=default]:w-10',
        'data-[size=sm]:h-5 data-[size=sm]:w-8',

        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform',

          // Размеры шариков оставляем прежними (16px и 12px)
          'group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3',

          // 3. Заменяем страшные calc на чистый сдвиг на 100% своей ширины.
          'group-data-[size=default]/switch:data-checked:translate-x-full group-data-[size=sm]/switch:data-checked:translate-x-full',
          'group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
