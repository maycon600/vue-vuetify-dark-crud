<template>
  <v-form ref="formRef" @submit.prevent="onSubmit" v-model="valid">
    <v-text-field
      v-model="model.title"
      label="Título"
      :rules="[r.required]"
      prepend-inner-icon="mdi-format-title"
    />
    <v-text-field
      v-model="model.category"
      label="Categoria"
      :rules="[r.required]"
      prepend-inner-icon="mdi-tag-outline"
    />
    <v-slider
      v-model="model.rating"
      :min="0"
      :max="10"
      step="1"
      label="Nota"
      thumb-label
      class="mt-2"
    />
    <v-textarea v-model="model.notes" label="Observações" auto-grow />

    <div class="d-flex ga-2 mt-2">
      <v-btn type="submit" color="primary" prepend-icon="mdi-content-save">
        Salvar
      </v-btn>
      <v-btn variant="text" @click="$emit('cancel')"> Cancelar </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["update:modelValue", "submit", "cancel"]);

const r = { required: (v: any) => !!v || "Obrigatório" };
const valid = ref(true);
const formRef = ref();

const defaults = { title: "", category: "", rating: 5, notes: "" };
const model = reactive({ ...defaults });

// ✅ SINCRONIZAÇÃO DO PAI → FILHO (aciona mesmo quando o pai muda propriedades do mesmo objeto)
watch(
  () => props.modelValue,
  (v) => Object.assign(model, v || defaults),
  { immediate: true, deep: true }
);

// ✅ FILHO → PAI
watch(model, () => emit("update:modelValue", model), { deep: true });

async function onSubmit() {
  // Força validação antes de emitir
  // @ts-ignore
  const res = await formRef.value?.validate?.();
  if (res?.valid ?? valid.value) emit("submit", { ...model });
}
</script>
