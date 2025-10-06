<template>
  <v-row>
    <v-col cols="12" md="7">
      <v-sheet class="pa-5 rounded-lg" color="surface">
        <div class="text-h6 mb-2">Sobre o Sistema</div>
        <p>
          Aplicação de exemplo para a disciplina **Frameworks Modernos** (UNEMAT
          — TADS). Demonstra Vue 3, Vuetify 3, vue-router, diretivas e CRUD com
          localStorage, em **modo dark**.
        </p>
        <ul class="mt-3">
          <li>Versão: <b>1.0.0</b></li>
          <li>Tema: Dark personalizado (MD3)</li>
          <li>Licença: MIT</li>
        </ul>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="5">
      <v-sheet class="pa-5 rounded-lg" color="surface">
        <div class="text-subtitle-1 mb-2">Estatísticas</div>
        <div class="text-body-2">
          Total de itens: <b>{{ items.length }}</b>
        </div>
        <div class="text-body-2">
          Categorias: <b>{{ categories.length }}</b>
        </div>
        <div class="text-body-2 mt-2">Top categorias</div>
        <v-chip-group column class="mt-1">
          <v-chip
            v-for="c in topCategories"
            :key="c.name"
            class="ma-1"
            variant="elevated"
            >{{ c.name }} ({{ c.count }})</v-chip
          >
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useCrud } from "../composables/useCrud";
const { items, categories } = useCrud();
const topCategories = computed(() => {
  const map = new Map<string, number>();
  items.value.forEach((i) =>
    map.set(i.category, (map.get(i.category) || 0) + 1)
  );
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
});
</script>
