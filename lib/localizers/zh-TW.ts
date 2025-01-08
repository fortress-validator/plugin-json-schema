import Localizer from '~/types/Localizer';

const localizer: Localizer = (_, errors) => {
  if (!errors) return;
  for (const e of errors) {
    let out;
    switch (e.keyword) {
      case 'additionalItems':
      case 'items': {
        out = `不能超過 ${e.params.limit} 個元素`;
        break;
      }
      case 'additionalProperties': {
        out = '不能有額外的屬性';
        break;
      }
      case 'anyOf': {
        out = '必須符合 "anyOf" 指定的模式';
        break;
      }
      case 'const': {
        out = '必須等於常數';
        break;
      }
      case 'contains': {
        out = '必須包含一個有效元素';
        break;
      }
      case 'dependencies':
      case 'dependentRequired': {
        out = `當 "${e.params.property}" 屬性存在時，必須有 "${e.params.deps}" 屬性`;
        break;
      }
      case 'discriminator': {
        switch (e.params.error) {
          case 'tag': {
            out = `標籤 "${e.params.tag}" 的類型必須是字串`;
            break;
          }
          case 'mapping': {
            out = `標籤 "${e.params.tag}" 必須在 "oneOf" 其中之一`;
            break;
          }
          default: {
            out = `必須通過 "${e.keyword}" 關鍵詞檢驗`;
          }
        }
        break;
      }
      case 'enum': {
        out = '必須是指定的其中一個值';
        break;
      }
      case 'false schema': {
        out = '布林模式不正確';
        break;
      }
      case 'format': {
        out = `必須要符合 ${e.params.format} 格式`;
        break;
      }
      case 'formatMaximum':
      case 'formatExclusiveMaximum': {
        out = `必須是 ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'formatMinimum':
      case 'formatExclusiveMinimum': {
        out = `必須是 ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'if': {
        out = `必須符合 "${e.params.failingKeyword}" 模式`;
        break;
      }
      case 'maximum':
      case 'exclusiveMaximum': {
        out = `必須要 ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'maxItems': {
        out = `不能多於 ${e.params.limit} 個`;
        break;
      }
      case 'maxLength': {
        out = `不能多於 ${e.params.limit} 個字元`;
        break;
      }
      case 'maxProperties': {
        out = `不能多於 ${e.params.limit} 個屬性`;
        break;
      }
      case 'minimum':
      case 'exclusiveMinimum': {
        out = `必須要 ${e.params.comparison} ${e.params.limit}`;
        break;
      }
      case 'minItems': {
        out = `不能少於 ${e.params.limit} 個`;
        break;
      }
      case 'minLength': {
        out = `不能少於 ${e.params.limit} 個字元`;
        break;
      }
      case 'minProperties': {
        out = `不能少於 ${e.params.limit} 個屬性`;
        break;
      }
      case 'multipleOf': {
        out = `必須是 ${e.params.multipleOf} 的整數倍`;
        break;
      }
      case 'not': {
        out = '必須不符合 "not" 中的模式';
        break;
      }
      case 'oneOf': {
        out = '只能符合一個 "oneOf" 中的模式';
        break;
      }
      case 'pattern': {
        out = `必須符合 "${e.params.pattern}" 模式`;
        break;
      }
      case 'patternRequired': {
        out = `必須有符合 "${e.params.missingPattern}" 模式的屬性`;
        break;
      }
      case 'propertyNames': {
        out = '必須是有效的属性名稱';
        break;
      }
      case 'required': {
        out = `必須有 "${e.params.missingProperty}" 屬性`;
        break;
      }
      case 'type': {
        out = `必須是 ${e.params.type} 類型`;
        break;
      }
      case 'unevaluatedItems': {
        out = `不能超過 ${e.params.len} 個元素`;
        break;
      }
      case 'unevaluatedProperties': {
        out = '不能有未驗證的屬性';
        break;
      }
      case 'uniqueItems': {
        out = `不能有重複的元素（第 ${e.params.j} 項和第 ${e.params.i} 項是重複的）`;
        break;
      }
      default: {
        out = `必須通過 "${e.keyword}" 關鍵詞檢驗`;
      }
    }
    e.message = e.instancePath
      ? `路徑為 "${e.instancePath}" 的屬性${out}`
      : `此欄位${out}`;
  }
};

export default localizer;
