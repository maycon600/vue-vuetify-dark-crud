<template>
  <v-app>
    <v-app-bar elevation="0" color="surface" density="comfortable">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold"
        >UNEMAT — Vue + Vuetify (Dark)</v-toolbar-title
      >
      <v-spacer />
      <v-btn icon="mdi-github" :href="repoUrl" target="_blank" variant="text" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="surface"
      :rail="rail"
      @click="rail = false"
    >
      <v-list density="compact" nav>
        <v-list-item to="/" prepend-icon="mdi-view-grid" title="Listagem" />
        <v-list-item to="/manage" prepend-icon="mdi-database" title="CRUD" />
        <v-list-item
          to="/about"
          prepend-icon="mdi-information-outline"
          title="Sobre"
        />
      </v-list>
      <template #append>
        <div class="pa-3">
          <v-switch
            inset
            v-model="rail"
            label="Modo compacto"
            color="primary"
          />
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>

    <AppSnackbar />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppSnackbar from "./components/AppSnackbar.vue";

const drawer = ref(true);
const rail = ref(false);
const repoUrl = "https://github.com/SEU-USUARIO/SEU-REPO";
</script>

<style scoped>
.v-application {
  letter-spacing: 0.2px;
}
</style>
