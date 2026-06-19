// src/lib/ha/fetcher.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchHAStates } from './fetcher';
import {
  mockFetchSuccess,
  mockFetchError,
  mockFetchNetworkCrash,
} from '@/lib/tests/utils';
import { mockHAStates } from '@/lib/tests/mockHAStates';

describe('fetchHAStates', () => {
  // Блок beforeEach выполняется ПЕРЕД КАЖДЫМ из 4-х тестов
  beforeEach(() => {
    // Очищаем счетчики вызовов всех моков (чтобы тесты не влияли друг на друга)
    vi.clearAllMocks();

    // Используем встроенный механизм Vitest вместо ручной перезаписи process.env
    vi.stubEnv('HA_URL', 'http://mock-homeassistant.local');
    vi.stubEnv('HA_TOKEN', 'secret_mock_token_123');

    // Глушим консоль. Наша функция делает console.error при ошибках.
    // Чтобы вывод тестов в терминале был чистым, мы заменяем ошибку на пустую функцию.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Блок afterEach выполняется ПОСЛЕ КАЖДОГО теста
  afterEach(() => {
    // Важно: очищаем и моки функций, и стабы переменных окружения
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  // ==========================================
  // КЕЙС 1: Счастливый путь (Happy Path)
  // ==========================================
  it('должен успешно возвращать массив устройств', async () => {
    mockFetchSuccess(mockHAStates);

    // Act (Действие)
    const result = await fetchHAStates();

    // Assert (Проверка)
    expect(result).toEqual(mockHAStates); // Проверяем, что функция вернула наши данные
    expect(fetch).toHaveBeenCalledTimes(1); // Убеждаемся, что запрос был ровно один

    // Продвинутая проверка: убеждаемся, что fetch ушел на правильный URL с правильным токеном
    expect(fetch).toHaveBeenCalledWith(
      'http://mock-homeassistant.local/api/states',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer secret_mock_token_123',
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
  });

  // ==========================================
  // КЕЙС 2: Ошибка конфигурации (.env)
  // ==========================================
  it('должен падать, если в .env отсутствует HA_URL', async () => {
    // Arrange: Ломаем идеальные условия, удаляя URL
    vi.stubEnv('HA_URL', '');

    // Act & Assert
    // Конструкция rejects.toThrow проверяет, что Promise упал с конкретной ошибкой
    await expect(fetchHAStates()).rejects.toThrow(
      'Home Assistant URL or token is missing in .env'
    );

    // Проверяем, что сеть вообще не дергалась (ведь мы упали раньше)
    expect(fetch).not.toHaveBeenCalled();
  });

  // ==========================================
  // КЕЙС 3: Ошибка API (например, неверный токен)
  // ==========================================
  it('должен падать и логировать ошибку, если HA вернул статус не 2xx', async () => {
    // Arrange: Имитируем, что токен протух (401 Unauthorized)
    mockFetchError(401, 'Unauthorized');

    // Act & Assert
    await expect(fetchHAStates()).rejects.toThrow(
      'HA API Error: 401 - Unauthorized'
    );

    // Проверяем, что наш console.error отработал внутри блока catch
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch Home Assistant states: ',
      expect.any(Error) // Нам неважен точный текст ошибки в логе, главное, что это объект Error
    );
  });

  // ==========================================
  // КЕЙС 4: Обрыв сети (упал интернет или роутер)
  // ==========================================
  it('должен прокидывать ошибку при физическом обрыве сети', async () => {
    // Arrange: Имитируем падение самого fetch
    mockFetchNetworkCrash('ERR_CONNECTION_REFUSED');

    // Act & Assert
    await expect(fetchHAStates()).rejects.toThrow('ERR_CONNECTION_REFUSED');
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
