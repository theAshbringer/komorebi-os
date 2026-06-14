// src/lib/ha/fetcher.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { resolvers } from './resolvers';
import { fetchHAStates } from '@/lib/ha/fetcher';
import { mockHAStates } from '@/lib/tests/mockHAStates';

describe('resolve devices via graphql', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mock('@/lib/ha/fetcher', () => ({
      fetchHAStates: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================
  // КЕЙС 1: Счастливый путь (Happy Path)
  // ==========================================
  it('должен успешно возвращать массив devices', async () => {
    const expectedData = [
      {
        entityId: 'switch.zhimi_ca1_b94b_physical_control_locked_2',
        friendlyName: 'Увлажнитель Physical Control Locked',
        state: 'unavailable',
      },
      {
        entityId: 'button.zhimi_ca1_b94b_info',
        friendlyName: 'Увлажнитель Info',
        state: 'unknown',
      },
      {
        entityId: 'light.chuangmi_212a01_0178_indicator_light',
        friendlyName: 'Индикатор розетки',
        state: 'on',
      },
      {
        entityId: 'light.chuangmi_212a01_1199_indicator_light',
        state: 'on',
        friendlyName: 'light.chuangmi_212a01_1199_indicator_light',
      },
    ];

    vi.mocked(fetchHAStates).mockResolvedValue(mockHAStates);

    // Act (Действие)
    const result = await resolvers.Query.devices();

    // Assert (Проверка)
    expect(result).toEqual(expectedData); // Проверяем, что функция вернула наши данные
    expect(fetchHAStates).toHaveBeenCalledTimes(1); // Убеждаемся, что запрос был ровно один
  });

  // ==========================================
  // КЕЙС 2: HA вернул пустой массив
  // ==========================================
  it('должен возвращать пустой массив, если от API пришел пустой массив', async () => {
    vi.mocked(fetchHAStates).mockResolvedValue([]);

    const result = await resolvers.Query.devices();

    expect(result).toEqual([]);
    expect(fetchHAStates).toHaveBeenCalledTimes(1);
  });
  // ==========================================
  // КЕЙС 3: Ошибка API внутри fetchHAStates
  // ==========================================
  it('должен падать с ошибкой, если fetchHAStates упал с ошибкой', async () => {
    vi.mocked(fetchHAStates).mockRejectedValue(new Error('Any error'));

    await expect(resolvers.Query.devices()).rejects.toThrow('Any error');
    expect(fetchHAStates).toHaveBeenCalledTimes(1);
  });
});
