const KEY = "unemat.items.v1";

export type Item = {
  id: string;
  title: string;
  category: string;
  rating: number;
  notes?: string;
  createdAt: number;
};

// novo tipo só para o form:
export type ItemForm = {
  id?: string;
  title: string;
  category: string;
  rating: number;
  notes?: string;
};

export function load(): Item[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function save(items: Item[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
