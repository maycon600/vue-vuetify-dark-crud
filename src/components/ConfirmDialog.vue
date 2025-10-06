<template>
  <v-dialog v-model="model" max-width="420">
    <v-card>
      <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="cancel">Cancelar</v-btn>
        <v-btn color="error" @click="confirm">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  modelValue: boolean;
  title?: string;
  message?: string;
}>();
const emits = defineEmits(["update:modelValue", "confirm"]);
const model = computed({
  get: () => props.modelValue,
  set: (v) => emits("update:modelValue", v),
});
function cancel() {
  model.value = false;
}
function confirm() {
  emits("confirm");
  model.value = false;
}
</script>
