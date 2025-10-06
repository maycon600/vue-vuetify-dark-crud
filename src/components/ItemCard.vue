<template>
  <v-card class="h-100" :title="item.title" :subtitle="item.category">
    <v-card-text>
      <div class="text-caption opacity-80">
        Nota: <b>{{ item.rating }}</b>
      </div>
      <div class="mt-2" v-if="item.notes">{{ item.notes }}</div>
      <div v-else class="text-disabled">Sem observações</div>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" size="small" @click="$emit('edit', item)"
        ><v-icon icon="mdi-pencil" class="mr-1" />Editar</v-btn
      >
      <v-btn
        variant="text"
        size="small"
        color="error"
        @click="$emit('delete', item)"
        ><v-icon icon="mdi-delete" class="mr-1" />Excluir</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import type { Item } from "../services/localDb";

defineProps<{ item: Item }>();
</script>
