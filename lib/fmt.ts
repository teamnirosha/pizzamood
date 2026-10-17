// Fills {name} placeholders in dictionary strings (functions cannot cross the server/client boundary).
export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
