<template>
  <v-snackbar v-model="open" :timeout="2400" location="bottom right">{{
    text
  }}</v-snackbar>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

// Event Bus mínimo via window
const open = ref(false);
const text = ref("");

function show(msg: string) {
  text.value = msg;
  open.value = true;
}

onMounted(() => {
  // @ts-ignore
  window.$toast = show;
});
</script>
