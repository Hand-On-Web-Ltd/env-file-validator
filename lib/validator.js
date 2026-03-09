const typeChecks = {
  string: v => v.length > 0,
  number: v => !isNaN(Number(v)),
  boolean: v => v === 'true' || v === 'false',
  url: v => v.startsWith('http://') || v.startsWith('https://'),
  email: v => v.includes('@')
};

function validate(envVars, schema) {
  return schema.map(rule => {
    let value = envVars[rule.name];
    let isDefault = false;

    if (value === undefined || value === '') {
      if (rule.required && !rule.default) {
        return { name: rule.name, valid: false, error: 'required but missing' };
      }
      if (rule.default) {
        value = rule.default;
        isDefault = true;
      }
      if (!rule.required && !rule.default) {
        return { name: rule.name, valid: true, value: '(not set)', isDefault: false };
      }
    }

    const checker = typeChecks[rule.type] || typeChecks.string;
    if (!checker(value)) {
      return { name: rule.name, valid: false, error: `expected ${rule.type}, got "${value}"` };
    }

    return { name: rule.name, valid: true, value, isDefault };
  });
}

module.exports = { validate };
