# env-file-validator

A CLI tool that validates your `.env` files against a schema. Define what variables your app expects, their types, and defaults — then run the validator to catch missing or broken config before your app blows up.

## Install

```bash
npm install -g @hand-on-web/env-file-validator
```

Or use npx:

```bash
npx @hand-on-web/env-file-validator
```

## Usage

```bash
env-validate --env .env --schema .env.schema
```

### Options

- `--env` — path to your .env file (default: `.env`)
- `--schema` — path to your schema file (default: `.env.schema`)
- `--quiet` — only show errors

## Schema Format

Create a `.env.schema` file:

```
# variable_name | type | required | default
DATABASE_URL | string | required |
PORT | number | optional | 3000
DEBUG | boolean | optional | false
API_KEY | string | required |
```

### Supported types

- `string` — any non-empty string
- `number` — must be a valid number
- `boolean` — must be `true` or `false`
- `url` — must start with `http://` or `https://`
- `email` — must contain `@`

## Example

```bash
$ env-validate --env sample.env --schema sample.env.schema

✓ DATABASE_URL = postgres://localhost/mydb
✓ PORT = 3000
✗ API_KEY is required but missing
✓ DEBUG = false (default)

1 error found
```


## About Hand On Web
We build AI chatbots, voice agents, and automation tools for businesses.
- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence
MIT
