import Ajv, { ValidateFunction } from 'ajv';

const ajv = new Ajv();

const schemaCache = new Map<string, ValidateFunction>();

export {
  ajv,
  schemaCache,
};
