import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify({
  blueprint: md3,
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#0b0f14",
          surface: "#121721",
          primary: "#7c4dff",
          secondary: "#26a69a",
          error: "#ef5350",
          info: "#42a5f5",
          success: "#66bb6a",
          warning: "#ffa726",
        },
      },
    },
  },
});

createApp(App).use(router).use(vuetify).mount("#app");
