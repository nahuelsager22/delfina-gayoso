import next from "eslint-config-next";

/**
 * ESLint flat config. `eslint-config-next` (Next 16) ya exporta un array flat
 * con las reglas de Core Web Vitals + TypeScript + React Hooks + a11y, así que
 * se compone directamente (sin FlatCompat). `next lint` fue removido en Next 16;
 * el linteo se corre con `eslint .` (ver script `lint`).
 */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
