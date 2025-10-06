<template>
  <v-row class="align-center mb-4 g-3">
    <v-col cols="12" md="5">
      <v-text-field
        v-model="query"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        clearable
      />
    </v-col>
    <v-col cols="6" md="3">
      <v-select
        v-model="category"
        :items="['', ...categories]"
        label="Categoria"
        item-title=""
        item-value=""
        return-object
      >
        <template #selection="{ item }">
          <span>{{ item?.title || "Todas" }}</span>
        </template>
      </v-select>
    </v-col>
    <v-col cols="6" md="2">
      <v-select v-model="sortBy" :items="sorts" label="Ordenar" />
    </v-col>
    <v-col cols="12" md="2" class="d-flex justify-end">
      <v-btn color="primary" :to="{ name: 'manage' }" prepend-icon="mdi-plus"
        >Novo</v-btn
      >
    </v-col>
  </v-row>

  <v-row v-if="filtered.length" dense>
    <v-col v-for="it in filtered" :key="it.id" cols="12" sm="6" md="4" lg="3">
      <ItemCard :item="it" @edit="goEdit(it.id)" @delete="askDelete(it.id)" />
    </v-col>
  </v-row>
  <v-sheet
    v-else
    class="pa-8 text-center text-medium-emphasis rounded-lg"
    color="surface"
  >
    <v-icon icon="mdi-emoticon-sad-outline" size="42" class="mb-2" />
    <div>Nenhum item encontrado</div>
  </v-sheet>

  <ConfirmDialog
    v-model="confirmOpen"
    title="Excluir item"
    :message="'Tem certeza que deseja excluir?'"
    @confirm="confirmDelete"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import ItemCard from "../components/ItemCard.vue";
import { useCrud } from "../composables/useCrud";

const router = useRouter();
const { filtered, categories, query, category, sortBy, remove } = useCrud();
const sorts = [
  { title: "Recentes", value: "createdAt" },
  { title: "Título", value: "title" },
  { title: "Nota", value: "rating" },
];

const confirmOpen = ref(false);
let toDelete: string | null = null;

function goEdit(id: string) {
  router.push({ name: "manage", query: { edit: id } });
}
function askDelete(id: string) {
  toDelete = id;
  confirmOpen.value = true;
}
function confirmDelete() {
  if (toDelete) {
    remove(toDelete); // @ts-ignore
    window.$toast?.("Item excluído");
    toDelete = null;
  }
}
</script>
