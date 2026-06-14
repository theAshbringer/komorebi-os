export const isNeededDeviceType = (entityId: string | undefined): boolean => {
  if (entityId == null) return false;

  const deviceTypes = ['switch', 'light', 'button'];
  return deviceTypes.includes(entityId.split('.')[0]);
};
