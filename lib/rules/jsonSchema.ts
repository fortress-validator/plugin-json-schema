import { Rule, RuleArguments } from '@fortress-validator/types';
import { isEmpty } from '@fortress-validator/utils';
import { ValidateFunction } from 'ajv';
import { ajv, schemaCache } from '~/core/ajv';
import locales from '~/localizers';

export interface JSONSchemaRuleArguments extends RuleArguments {
  locale: string;
  schema: Record<string, unknown>;
}

const jsonSchema: Rule<JSONSchemaRuleArguments> = ({ locale, schema }) => {
  const validate = compileSchema(schema);
  return (input: unknown) => {
    if (isEmpty(input)) return false;
    if (typeof input === 'string') {
      try {
        input = JSON.parse(input);
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    if (validate(input)) return true;
    const { errors } = validate;
    if (errors && errors.length > 0) {
      const localize = locales[locale] || locales.en;
      localize(errors);
      const [error] = errors;
      return error.message || false;
    }
    return false;
  };
};

const compileSchema = (schema: Record<string, unknown>): ValidateFunction => {
  const cacheKey = JSON.stringify(schema);
  const cached = schemaCache.get(cacheKey);
  if (cached) return cached;
  try {
    const validate = ajv.compile(schema);
    schemaCache.set(cacheKey, validate);
    return validate;
  } catch (err) {
    throw new Error(`Invalid schema: ${(err as Error).message.replace('schema is invalid: ', '')}`);
  }
};

export default jsonSchema;
