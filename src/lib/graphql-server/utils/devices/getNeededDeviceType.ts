export type NeededDeviceType = 'switch' | 'light' | 'button';

export const getNeededDeviceType = (
  entityId: string | undefined
): NeededDeviceType | null => {
  if (!entityId) return null;

  const [domain, objectId] = entityId.split('.');

  if (!objectId) return null;

  if (domain === 'switch' || domain === 'light' || domain === 'button') {
    return domain;
  }

  return null;
};
