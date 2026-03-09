function parseSchema(content) {
  const rules = [];
  content.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const parts = line.split('|').map(s => s.trim());
    if (parts.length < 2) return;
    rules.push({
      name: parts[0],
      type: parts[1] || 'string',
      required: (parts[2] || 'required') === 'required',
      default: parts[3] || undefined
    });
  });
  return rules;
}

module.exports = { parseSchema };
