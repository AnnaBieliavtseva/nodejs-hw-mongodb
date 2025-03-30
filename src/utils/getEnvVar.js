import 'dotenv/config';

export const getEnvVar = (name, defaultValue) => {
  // eslint-disable-next-line no-undef
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Cannnot find process.env${name}`);
};
