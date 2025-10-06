/// <reference types="vuetify" />

// Necessário porque importamos apenas CSS (side-effect import) com TS checando imports.
declare module "vuetify/styles" {
  const content: any;
  export default content;
}
