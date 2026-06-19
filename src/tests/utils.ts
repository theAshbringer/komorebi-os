import { vi } from 'vitest';

/**
 * Имитирует успешный ответ сервера (статус 200)
 * @param data Данные, которые должны вернуться после await res.json()
 */
export function mockFetchSuccess(data: unknown) {
  const fakeResponse = {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => data, // Тот самый вложенный Promise
  };

  // Подменяем глобальный fetch в среде Node.js
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(fakeResponse));
}

/**
 * Имитирует ответ сервера с ошибкой (например, 401, 404, 500)
 */
export function mockFetchError(status: number, statusText: string) {
  const fakeResponse = {
    ok: false,
    status,
    statusText,
    json: async () => ({}), // При ошибке тело обычно не читаем
  };

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(fakeResponse));
}

/**
 * Имитирует физический обрыв сети (когда сам fetch падает с ошибкой)
 */
export function mockFetchNetworkCrash(
  errorMessage = 'Network connection lost'
) {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error(errorMessage)));
}
