// @ts-check
import { adufr } from '@adufr/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  adufr({
    vue: true,
    prettier: true,
    markdown: true,
    sortKeys: true,
  }),
)
