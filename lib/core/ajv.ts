import type { ValidateFunction } from 'ajv';
import Ajv from 'ajv';

const ajv = new Ajv();

const schemaCache = new Map<string, ValidateFunction>();

export {
  ajv,
  schemaCache,
};
