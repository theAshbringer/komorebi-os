import { mockHAStates } from '@/tests/mockHAStates';
import {
  mockFetchError,
  mockFetchNetworkCrash,
  mockFetchSuccess,
} from '@/tests/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchHAStates } from './fetcher';

// 1. Создаем локальный объект с дефолтными валидными значениями для тестов.
// Он создается ДО импорта fetcher благодаря механизму hoisting в Vitest.
const baseMockEnv = {
  HA_URL: 'http://mock-homeassistant.local',
  HA_TOKEN: 'secret_mock_token_123',
  NEXT_PUBLIC_HOST_URL: 'http://mock-host.local',
};

// Теккущие значения env, которые мы сможем менять внутри тестов
let currentMockEnv = { ...baseMockEnv };

// 2. Мокаем модуль env. Используем геттер, чтобы fetcher всегда получал
// актуальное состояние currentMockEnv, даже если мы изменили его внутри it()
vi.mock('@/lib/env', () => ({
  get env() {
    return currentMockEnv;
  },
}));

describe('fetchHAStates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Перед каждым тестом возвращаем env к эталонным валидным значениям
    currentMockEnv = { ...baseMockEnv };

    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ==========================================
  // КЕЙС 1: Счастливый путь (Happy Path)
  // ==========================================
  it('должен успешно возвращать массив устройств', async () => {
    const testData = mockHAStates.slice(0, 2);
    mockFetchSuccess(testData);

    const result = await fetchHAStates();

    expect(result).toEqual(testData);
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      'http://mock-homeassistant.local/api/states',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: 'Bearer secret_mock_token_123',
          'Content-Type': 'application/json',
        },
      })
    );
  });

  // ==========================================
  // КЕЙС 2: Ошибка конфигурации
  // ==========================================
  it('должен падать, если отсутствует HA_URL', async () => {
    currentMockEnv.HA_URL = '';

    await expect(fetchHAStates()).rejects.toThrow(
      'Home Assistant URL or token is missing in .env'
    );

    expect(fetch).not.toHaveBeenCalled();
  });

  // ==========================================
  // КЕЙС 3: Ошибка API (например, неверный токен)
  // ==========================================
  it('должен падать и логировать ошибку, если HA вернул статус не 2xx', async () => {
    mockFetchError(401, 'Unauthorized');

    await expect(fetchHAStates()).rejects.toThrow(
      'HA API Error: 401 - Unauthorized'
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch Home Assistant states: ',
      expect.any(Error)
    );
  });

  // ==========================================
  // КЕЙС 4: Обрыв сети
  // ==========================================
  it('должен прокидывать ошибку при физическом обрыве сети', async () => {
    mockFetchNetworkCrash('ERR_CONNECTION_REFUSED');

    await expect(fetchHAStates()).rejects.toThrow('ERR_CONNECTION_REFUSED');
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
