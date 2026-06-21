import { describe, expect, it } from 'vitest';
import { getNeededDeviceType } from './getNeededDeviceType';

describe('check getNeededDeviceType', () => {
  // ==========================================
  // УСПЕШНЫЕ КЕЙСЫ: Возвращают тип устройства
  // ==========================================
  it('должен вернуть "light" для устройства light', () => {
    const entityId = 'light.chuangmi_212a01_0178_indicator_light';
    expect(getNeededDeviceType(entityId)).toBe('light');
  });

  it('должен вернуть "button" для устройства button', () => {
    const entityId = 'button.miaomiaoce_t2_7613_info';
    expect(getNeededDeviceType(entityId)).toBe('button');
  });

  it('должен вернуть "switch" для устройства switch', () => {
    const entityId = 'switch.0x54ef441000a29575_channel_1';
    expect(getNeededDeviceType(entityId)).toBe('switch');
  });

  // ==========================================
  // НЕУСПЕШНЫЕ КЕЙСЫ: Возвращают null
  // ==========================================
  it('должен вернуть null для неподходящего типа устройства (binary_sensor)', () => {
    const entityId = 'binary_sensor.54ef44301941_gateway';
    expect(getNeededDeviceType(entityId)).toBe(null);
  });

  it('должен вернуть null для пустой строки', () => {
    const entityId = '';
    expect(getNeededDeviceType(entityId)).toBe(null);
  });

  it('должен вернуть null для строки без точки', () => {
    const entityId = 'wall_switch_bathroom_general_light';
    expect(getNeededDeviceType(entityId)).toBe(null);
  });

  it('должен вернуть null для undefined', () => {
    const entityId = undefined;
    expect(getNeededDeviceType(entityId)).toBe(null);
  });
});
