import { fetchHAStates } from '@/lib/ha/fetcher';
import { HAState, HAStateState } from '@/lib/ha/types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resolvers } from './resolvers';

vi.mock('@/lib/ha/fetcher', () => ({
  fetchHAStates: vi.fn(),
}));

const createHAStateMock = (entityId: string, friendlyName?: string) => ({
  entity_id: entityId,
  state: 'on' as HAStateState,
  attributes: friendlyName ? { friendly_name: friendlyName } : {},
});

describe('resolve devices via graphql', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================
  // КЕЙС 1: Проверка маппинга и фильтрации (Happy Path)
  // ==========================================
  it('должен правильно фильтровать устройства и выставлять им deviceType', async () => {
    // Готовим минимальный, понятный набор входных данных прямо тут
    const mockInput: Partial<HAState>[] = [
      createHAStateMock('switch.living_room_main', 'Главный свет'),
      createHAStateMock('light.kitchen_led'), // без friendly_name для проверки фолбека
      createHAStateMock('binary_sensor.door_sensor'), // должно отфильтроваться
    ];

    vi.mocked(fetchHAStates).mockResolvedValue(mockInput as HAState[]);

    const result = await resolvers.Query.devices();

    expect(fetchHAStates).toHaveBeenCalledTimes(1);

    // Проверяем, что binary_sensor отфильтровался (осталось 2 устройства из 3)
    expect(result).toHaveLength(2);

    // Используем toMatchObject вместо toEqual.
    // Если в будущем в резолвер добавятся новые поля — этот тест НЕ СЛОМАЕТСЯ.
    expect(result).toMatchObject([
      {
        entityId: 'switch.living_room_main',
        deviceType: 'switch',
        friendlyName: 'Главный свет',
      },
      {
        entityId: 'light.kitchen_led',
        deviceType: 'light',
        friendlyName: 'light.kitchen_led', // проверили работу фолбека
      },
    ]);
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
