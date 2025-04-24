export function parsePIXCode(pixCode: string) {
    const fieldPattern = /(\d{2})(\d{2})([^0-9]*)([0-9]*)/g;
    const result: Record<string, string | Record<string, string>> = {};
    let match: RegExpExecArray | null;
    
    while ((match = fieldPattern.exec(pixCode)) !== null) {
      const [, id, _length, textValue, numValue] = match;
      const value = textValue || numValue;
      
      result[id] = value;
      
      if (id === '26' || id === '62') {
        const nestedFields = parseNestedFields(value);
        result[`${id}_nested`] = nestedFields;
      }
    }
    
    result.CRC16 = pixCode.slice(-4);
    
    return result;
  }
  
  function parseNestedFields(template: string) {
    const nestedPattern = /(\d{2})(\d{2})([^0-9]*)([0-9]*)/g;
    const nestedResult: Record<string, string> = {};
    let nestedMatch: RegExpExecArray | null;
    
    while ((nestedMatch = nestedPattern.exec(template)) !== null) {
      const [, id, _length, textValue, numValue] = nestedMatch;
      nestedResult[id] = textValue || numValue;
    }
    
    return nestedResult;
  }