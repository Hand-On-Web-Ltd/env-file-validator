#!/usr/bin/env node

const { parseArgs } = require('util');
const { readFileSync } = require('fs');
const { parseSchema } = require('./lib/schema-parser');
const { validate } = require('./lib/validator');

const { values } = parseArgs({
  options: {
    env: { type: 'string', default: '.env' },
    schema: { type: 'string', default: '.env.schema' },
    quiet: { type: 'boolean', default: false }
  }
});

let envContent, schemaContent;
try {
  envContent = readFileSync(values.env, 'utf8');
} catch {
  console.error(`Cannot read env file: ${values.env}`);
  process.exit(1);
}
try {
  schemaContent = readFileSync(values.schema, 'utf8');
} catch {
  console.error(`Cannot read schema file: ${values.schema}`);
  process.exit(1);
}

const envVars = {};
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const eq = line.indexOf('=');
  if (eq === -1) return;
  envVars[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
});

const schema = parseSchema(schemaContent);
const results = validate(envVars, schema);

let errors = 0;
results.forEach(r => {
  if (r.valid) {
    if (!values.quiet) {
      const suffix = r.isDefault ? ' (default)' : '';
      console.log(`✓ ${r.name} = ${r.value}${suffix}`);
    }
  } else {
    errors++;
    console.log(`✗ ${r.name} — ${r.error}`);
  }
});

if (errors > 0) {
  console.log(`\n${errors} error${errors > 1 ? 's' : ''} found`);
  process.exit(1);
} else {
  if (!values.quiet) console.log('\nAll good ✓');
}
