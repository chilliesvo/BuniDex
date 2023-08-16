import * as Joi from 'joi';
import { EnvConfig } from '../@types/configs.type';

const envConfig: Partial<EnvConfig> = {
  port: process.env.REACT_APP_PORT,
  apiURL: process.env.REACT_APP_API_URL,
};

export const validateEnvConfig = () => {
  const schema = Joi.object({
    port: Joi.number().integer().required(),
    apiURL: Joi.string().uri().required(),
  });
  // Validate the environment variables
  const { error } = schema.validate(envConfig, { abortEarly: false });

  // If there are validation errors, log them and exit the process
  if (error) {
    throw new Error(error.message);
  }
  return true;
};

export default envConfig;
