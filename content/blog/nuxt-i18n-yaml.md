---
title: 'Use YAML locale files in Nuxt 3'
description: 'How to properly load YAML locale files in a Nuxt 3 application using nuxt-i18n.'
date: 2024-03-02
image: https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg
minRead: 3
author:
  name: Arthur Dufour
  avatar:
    src: https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
    alt: Arthur Dufour
---

Have you ever tried loading YAML locale files inside your Nuxt 3 application using [nuxt-i18n](https://i18n.nuxtjs.org/)?

If you did, did you also come across the following error?

```
ERROR  Failed to parse source for import analysis because the content contains invalid JS syntax. You may need to install appropriate plugins to handle the .yaml file format, or if it's an asset, add "**/*.yaml" to assetsInclude in your configuration.
```

This article shows you how to properly setup Nuxt so it knows how to handle YAML files.

## Configure Vite to handle YAML files

The above error message states that Vite doesn't know how to handle YAML files by default; it requires a plugin for that.

### Install `@modyfi/vite-plugin-yaml`

See the package [on npmjs.com](https://www.npmjs.com/package/@modyfi/vite-plugin-yaml).

```bash
pnpm i -D @modyfi/vite-plugin-yaml
# or
# npm install -D @modyfi/vite-plugin-yaml
# or
# yarn add -D @modyfi/vite-plugin-yaml
```

### Register the plugin

Then register the Vite plugin inside your Nuxt config file.

```typescript
// nuxt.config.ts
import ViteYaml from '@modyfi/vite-plugin-yaml'

export default defineNuxtConfig({
  vite: {
    plugins: [ViteYaml()],
  },
})
```

### Add type definitions (optional)

Optionnaly, you can also add type definitions for `.yaml` or `.yml` modules.

```json
// tsconfig.json
{
  "extends": "./.nuxt/tsconfig.json",

  "compilerOptions": {
    "types": ["./types/index.d.ts", "@modyfi/vite-plugin-yaml/modules"]
  }
}
```

## Nuxt i18n configuration

Once Vite knows how to import yaml files, you can configure nuxt-i18n.

```typescript
// i18n.config.ts
import en from './locales/en.yaml'
import fr from './locales/fr.yaml'

export default defineI18nConfig(() => ({
  messages: {
    en,
    fr,
  },
}))
```

And _voilà_ 🎉 You should now be able to use translations from YAML files!

## BONUS: Lint your YAML files using ESLint

When I use YAML for my locale files, I like having my keys sorted alphabetically. For that, I'm using [ESLint](https://eslint.org/) with [yaml-eslint-parser](https://github.com/ota-meshi/yaml-eslint-parser).

I assume you already have setup ESLint in your project.

### Install `yaml-eslint-parser`

```bash
pnpm i -D yaml-eslint-parser
# or
# npm install -D yaml-eslint-parser
# or
# yarn add -D yaml-eslint-parser
```

### Configure ESLint

Once the YAML parser module has been installed, you need to instruct ESLint to use it on `.yaml` and `.yml` files.

```js
// .eslintrc.cjs
module.exports = {
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      extends: ['plugin:yml/standard'],
      rules: {
        'yml/sort-keys': [
          2,
          'asc',
          {
            caseSensitive: true,
            natural: true,
          },
        ],
      },
    },
  ],
}
```
