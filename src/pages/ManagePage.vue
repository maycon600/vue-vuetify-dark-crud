<template>
  <v-row>
    <v-col cols="12" md="5">
      <v-sheet class="pa-4 rounded-lg" color="surface">
        <div class="text-subtitle-1 mb-3">
          {{ editing ? "Editar" : "Novo" }} item
        </div>
        <ItemForm v-model="form" @submit="save" @cancel="reset" />
      </v-sheet>
    </v-col>
    <v-col cols="12" md="7">
      <v-data-table
        :items="items"
        :headers="headers"
        item-key="id"
        density="compact"
      >
        <template #item.actions="{ item }">
          <v-btn variant="text" icon="mdi-pencil" @click="edit(item.id)" />
          <v-btn
            variant="text"
            icon="mdi-delete"
            color="error"
            @click="del(item.id)"
          />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import ItemForm from "../components/ItemForm.vue";
import { useCrud } from "../composables/useCrud";
const { items, create, update, remove, getById } = useCrud();
const form = reactive<any>({ title: "", category: "", rating: 5, notes: "" });
const editing = computed(() => !!form.id);
const defaults = { title: "", category: "", rating: 5, notes: "" };
const props = defineProps<{ modelValue: any }>();
const model = reactive({ ...defaults });
const emit = defineEmits(["submit", "cancel"]);
watch(
  () => props.modelValue,
  (v) => Object.assign(model, v || defaults),
  { immediate: true, deep: true }
);

// Garante defaults quando o pai passar objeto vazio/novo

const headers = [
  { title: "Título", key: "title" },
  { title: "Categoria", key: "category" },
  { title: "Nota", key: "rating", width: 80 },
  { title: "Ações", key: "actions", sortable: false, width: 110 },
];
function save(payload: any) {
  if (form.id) update(form.id, payload);
  else create(payload);
  reset();
}
function edit(id: string) {
  const it = getById(id);
  if (it) Object.assign(form, it);
}
function del(id: string) {
  remove(id);
}
function reset() {
  Object.assign(form, {
    id: undefined,
    title: "",
    category: "",
    rating: 5,
    notes: "",
  });
}
const route = useRoute();
onMounted(() => {
  const id = route.query.edit as string | undefined;
  if (id) edit(id);
});
</script>
