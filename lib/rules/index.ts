import type { Rule, Rules } from '@fortress-validator/types';
import jsonSchema from './jsonSchema';

const rules: Rules = {
  jsonSchema: jsonSchema as Rule<unknown>,
};

export default rules;
