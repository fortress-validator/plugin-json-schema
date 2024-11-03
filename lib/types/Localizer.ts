import { ErrorObject } from 'ajv';

interface Localizer {
  (errors: ErrorObject[]): void;
}

export default Localizer;
