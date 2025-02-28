import type { ErrorObject } from 'ajv';

interface Localizer {
  (field: string, errors: ErrorObject[]): void;
}

export default Localizer;
