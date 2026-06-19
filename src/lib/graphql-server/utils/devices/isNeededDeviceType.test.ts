import { describe, expect, it } from 'vitest';
import { isNeededDeviceType } from './isNeededDeviceType';

describe(' checkisNeededDeviceType', () => {
  // ==========================================
  // КЕЙС 1: Передан подходящий тип устройства (light)
  // ==========================================
  it('должен выдать true для устройства light', () => {
    const entityId = 'light.chuangmi_212a01_0178_indicator_light';
    expect(isNeededDeviceType(entityId)).toBe(true);
  });

  // ==========================================
  // КЕЙС 2: Передан подходящий тип устройства (button)
  // ==========================================
  it('должен выдать true для устройства button', () => {
    const entityId = 'button.miaomiaoce_t2_7613_info';
    expect(isNeededDeviceType(entityId)).toBe(true);
  });

  // ==========================================
  // КЕЙС 3: Передан подходящий тип устройства (switch)
  // ==========================================
  it('должен выдать true для устройства switch', () => {
    const entityId = 'switch.0x54ef441000a29575_channel_1';
    expect(isNeededDeviceType(entityId)).toBe(true);
  });

  // ==========================================
  // КЕЙС 4: Передан неподходящий тип устройства (binary_sensor)
  // ==========================================
  it('должен выдать false для устройства binary_sensor', () => {
    const entityId = 'binary_sensor.54ef44301941_gateway';
    expect(isNeededDeviceType(entityId)).toBe(false);
  });

  // ==========================================
  // КЕЙС 5: Передана пустая строка
  // ==========================================
  it('должен выдать false для пустой строки', () => {
    const entityId = '';
    expect(isNeededDeviceType(entityId)).toBe(false);
  });

  // ==========================================
  // КЕЙС 6: Передана строка без точки
  // ==========================================
  it('должен выдать false для строки без точки', () => {
    const entityId = 'wall_switch_bathroom_general_light';
    expect(isNeededDeviceType(entityId)).toBe(false);
  });

  // ==========================================
  // КЕЙС 7: Передан unedfined
  // ==========================================
  it('должен выдать false для undefined', () => {
    const entityId = undefined;
    expect(isNeededDeviceType(entityId)).toBe(false);
  });
});
