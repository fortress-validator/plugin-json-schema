import { describe, expect, test } from 'vitest';
import jsonSchema from './jsonSchema';

describe('Rule "jsonSchema"', () => {
  describe('set to an invalid schema', () => {
    const schema = {
      type: true,
    };

    test('should throw an error', () => {
      expect(() => jsonSchema({ locale: 'en', schema })).toThrowError('Invalid schema');
    });
  });

  describe('set to a valid schema', () => {
    const schema = {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        properties: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/nestedObject',
          },
          minProperties: 1,
        },
      },
      required: [
        'title',
      ],
      definitions: {
        nestedObject: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            properties: {
              $ref: '#/definitions/nestedObject',
            },
          },
          required: [
            'title',
          ],
          minProperties: 1,
        },
      },
    };

    const validate = jsonSchema({ locale: 'en', schema });

    test('should pass with valid input', () => {
      const input = JSON.stringify({
        title: 'foo',
      });

      expect(validate(input)).toBe(true);
    });

    describe('should fail', () => {
      test('without "title" property', () => {
        const input = JSON.stringify({});

        expect(validate(input)).toBe('The json schema field must have required property "title".');
      });

      test('without "title" property in "nestedObject"', () => {
        const input = JSON.stringify({
          title: 'foo',
          properties: {
            nestedObject: {
              foo: {},
            },
          },
        });

        expect(validate(input)).toBe('The property at path "/properties/nestedObject" must have required property "title".');
      });

      test('with "title" property not set to a string', () => {
        const input = JSON.stringify({
          title: true,
        });

        expect(validate(input)).toBe('The property at path "/title" must be string.');
      });

      test('with "title" property not set to a string in "nestedObject"', () => {
        const input = JSON.stringify({
          title: 'foo',
          properties: {
            nestedObject: {
              title: true,
            },
          },
        });

        expect(validate(input)).toBe('The property at path "/properties/nestedObject/title" must be string.');
      });

      test('without properties', () => {
        const input = JSON.stringify({
          title: 'foo',
          properties: {},
        });

        expect(validate(input)).toBe('The property at path "/properties" must NOT have less than 1 property.');
      });

      test('without properties in "nestedObject"', () => {
        const input = JSON.stringify({
          title: 'foo',
          properties: {
            nestedObject: {
              title: 'foo',
              properties: {},
            },
          },
        });

        expect(validate(input)).toBe('The property at path "/properties/nestedObject/properties" must NOT have less than 1 property.');
      });
    });
  });
});
