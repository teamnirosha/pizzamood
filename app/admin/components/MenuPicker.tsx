"use client";

import { MENU_CATEGORIES, type MenuCategoryId, type StoreModel } from "@/lib/menu";

type Props = {
  model: StoreModel;
  menuCategories: MenuCategoryId[];
  onChange: (v: { model: StoreModel; menuCategories: MenuCategoryId[] }) => void;
};

export default function MenuPicker({ model, menuCategories, onChange }: Props) {
  const toggle = (id: MenuCategoryId) =>
    onChange({
      model,
      menuCategories: menuCategories.includes(id) ? menuCategories.filter((c) => c !== id) : [...menuCategories, id],
    });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
      <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">Store Model & Menu</h2>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-400">Store Model</label>
        <select
          value={model}
          onChange={(e) => onChange({ model: e.target.value as StoreModel, menuCategories })}
          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
        >
          <option value="cafe">Cafe</option>
          <option value="kiosk">Kiosk</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-400">Products sold at this store</label>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {MENU_CATEGORIES.map((c) => (
            <label key={c.id} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-bold text-white">
              <input type="checkbox" checked={menuCategories.includes(c.id)} onChange={() => toggle(c.id)} />
              {c.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
