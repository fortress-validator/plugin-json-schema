import Localizer from '~/types/Localizer';

const localizer: Localizer = (field, errors) => {
  if (!errors) return;
  for (const e of errors) {
    let out;
    switch (e.keyword) {
      case 'additionalItems':
      case 'items': {
        const n = e.params.limit;
        out = `must NOT have more than ${n} item${n != 1 ? 's' : ''}`;
        break;
      }
      case 'additionalProperties': {
        out = 'must NOT have additional properties';
        break;
      }
      case 'anyOf': {
        out = 'must match a schema in "anyOf"';
        break;
      }
      case 'const': {
        out = 'must be equal to constant';
        break;
      }
      case 'contains': {
        out = 'must contain a valid item';
        break;
      }
      case 'dependencies':
      case 'dependentRequired': {
        const n = e.params.depsCount;
        out = `must have propert${n == 1 ? 'y' : 'ies'} ${e.params.deps} when property ${e.params.property} is present`;
        break;
      }
      case 'discriminator': {
        switch (e.params.error) {
          case 'tag': {
            out = `tag "${e.params.tag}" must be string`;
            break;
          }
          case 'mapping': {
            out = `value of tag "${e.params.tag}" must be in "oneOf"`;
            break;
          }
          default: {
            out = `must pass "${e.keyword}" keyword validation`;
          }
        }
        break;
      }
      case 'enum': {
        out = 'must be equal to one of the allowed values';
        break;
      }
      case 'false schema': {
        out = 'boolean schema is false';
        break;
      }
      case 'format': {
        out = `must match format "${e.params.format}"`;
        break;
      }
      case 'formatMaximum':
      case 'formatExclusiveMaximum': {
        out = `must be ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'formatMinimum':
      case 'formatExclusiveMinimum': {
        out = `must be ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'if': {
        out = `must match "${e.params.failingKeyword}" schema`;
        break;
      }
      case 'maximum':
      case 'exclusiveMaximum': {
        out = `must be ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'maxItems': {
        const n = e.params.limit;
        out = `must NOT have more than ${n} item${n != 1 ? 's' : ''}`;
        break;
      }
      case 'maxLength': {
        const n = e.params.limit;
        out = `must NOT be longer than ${n} character${n != 1 ? 's' : ''}`;
        break;
      }
      case 'maxProperties': {
        const n = e.params.limit;
        out = `must NOT have more than ${n} propert${n == 1 ? 'y' : 'ies'}`;
        break;
      }
      case 'minimum':
      case 'exclusiveMinimum': {
        out = `must be ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'minItems': {
        const n = e.params.limit;
        out = `must NOT have less than ${n} item${n != 1 ? 's' : ''}`;
        break;
      }
      case 'minLength': {
        const n = e.params.limit;
        out = `must NOT be shorter than ${n} character${n != 1 ? 's' : ''}`;
        break;
      }
      case 'minProperties': {
        const n = e.params.limit;
        out = `must NOT have less than ${n} propert${n == 1 ? 'y' : 'ies'}`;
        break;
      }
      case 'multipleOf': {
        out = `must be a multiple of ${e.params.multipleOf}`;
        break;
      }
      case 'not': {
        out = 'must NOT be valid according to schema in "not"';
        break;
      }
      case 'oneOf': {
        out = 'must match exactly one schema in "oneOf"';
        break;
      }
      case 'pattern': {
        out = `must match pattern "${e.params.pattern}"`;
        break;
      }
      case 'patternRequired': {
        out = `must have property matching pattern "${e.params.missingPattern}"`;
        break;
      }
      case 'propertyNames': {
        out = 'property name is invalid';
        break;
      }
      case 'required': {
        out = `must have required property "${e.params.missingProperty}"`;
        break;
      }
      case 'type': {
        out = `must be ${e.params.type}`;
        break;
      }
      case 'unevaluatedItems': {
        const n = e.params.len;
        out = `must NOT have more than ${n} item${n != 1 ? 's' : ''}`;
        break;
      }
      case 'unevaluatedProperties': {
        out = 'must NOT have unevaluated properties';
        break;
      }
      case 'uniqueItems': {
        out = `must NOT have duplicate items (items #${e.params.j} and #${e.params.i} are identical)`;
        break;
      }
      default: {
        out = `must pass "${e.keyword}" keyword validation`;
      }
    }
    e.message = e.instancePath
      ? `The property at path "${e.instancePath}" ${out}.`
      : `The ${field.toLowerCase()} field ${out}.`;
  }
};

export default localizer;
