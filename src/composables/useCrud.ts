import { computed, ref, watch } from "vue";
import { load, save, type Item } from "../services/localDb";

const items = ref<Item[]>(load());

watch(items, (val) => save(val), { deep: true });

export function useCrud() {
  const query = ref("");
  const category = ref<string | null>(null);
  const sortBy = ref<"title" | "rating" | "createdAt">("createdAt");

  const filtered = computed(() => {
    let data = [...items.value];
    if (query.value) {
      const q = query.value.toLowerCase();
      data = data.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.notes?.toLowerCase().includes(q)
      );
    }
    if (category.value)
      data = data.filter((i) => i.category === category.value);
    data.sort((a, b) =>
      (a[sortBy.value] as number | string) >
      (b[sortBy.value] as number | string)
        ? -1
        : 1
    );
    return data;
  });

  function uuid() {
    // Fallback para navegadores sem crypto.randomUUID (ex.: Safari antigo)
    try {
      return (crypto as any)?.randomUUID?.();
    } catch {
      /* no-op */
    }
    return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function create(payload: Omit<Item, "id" | "createdAt">) {
    const newItem: Item = { id: uuid(), createdAt: Date.now(), ...payload };
    try {
      items.value.unshift(newItem);
      // feedback
      // @ts-ignore
      window.$toast?.("Item criado");
    } catch (e) {
      console.error("Falha ao criar item", e);
    }
    return newItem;
  }

  function update(id: string, patch: Partial<Item>) {
    const idx = items.value.findIndex((i) => i.id === id);
    if (idx >= 0) {
      // @ts-ignore
      items.value[idx] = { ...items.value[idx], ...patch };
      // @ts-ignore
      window.$toast?.("Item atualizado");
    }
  }

  function remove(id: string) {
    items.value = items.value.filter((i) => i.id !== id);
    // @ts-ignore
    window.$toast?.("Item excluído");
  }

  function getById(id: string) {
    return items.value.find((i) => i.id === id);
  }

  const categories = computed(() =>
    Array.from(new Set(items.value.map((i) => i.category))).sort()
  );

  return {
    items,
    filtered,
    categories,
    query,
    category,
    sortBy,
    create,
    update,
    remove,
    getById,
  };
}
