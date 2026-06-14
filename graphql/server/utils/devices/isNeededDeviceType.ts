export const isNeededDeviceType = (entityId: string): boolean => {
  const deviceTypes = ['switch', 'light', 'button'];
  return deviceTypes.includes(entityId.split('.')[0]);
};
