import { z } from 'zod';

const envSchema = z.object({
  HA_URL: z.url('HA_URL must be a valid URL'),
  HA_TOKEN: z.string().min(10, 'HA_TOKEN is too short or missing'),
});

// Безопасно парсим process.env
const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables in .env:');
    console.error(z.prettifyError(result.error));

    throw new Error(
      `\nInvalid environment variables:\n${z.prettifyError(result.error)}`
    );
  }

  return result.data;
};

export const env = parseEnv();
