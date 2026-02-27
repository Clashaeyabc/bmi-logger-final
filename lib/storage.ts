import type { BmiLog } from "./types";

const KEY = "bmi_logger_logs_v1";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

export function loadLogs(): BmiLog[] {
  if (typeof window === "undefined") return [];
  const parsed = safeParse<BmiLog[]>(localStorage.getItem(KEY));
  if (!parsed) return [];
  // sanitize minimal
  return parsed.filter(x => x && typeof x.id === "string");
}

export function saveLogs(logs: BmiLog[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(logs));
}

export function addLog(newLog: BmiLog): BmiLog[] {
  const logs = loadLogs();
  const next = [newLog, ...logs];
  saveLogs(next);
  return next;
}

export function updateLog(id: string, patch: Partial<BmiLog>): BmiLog[] {
  const logs = loadLogs();
  const next = logs.map(l => (l.id === id ? { ...l, ...patch, updated_at: new Date().toISOString() } : l));
  saveLogs(next);
  return next;
}

export function deleteLog(id: string): BmiLog[] {
  const logs = loadLogs();
  const next = logs.filter(l => l.id !== id);
  saveLogs(next);
  return next;
}

export function exportJson(): string {
  const logs = loadLogs();
  return JSON.stringify({ version: 1, exported_at: new Date().toISOString(), logs }, null, 2);
}

export function importJson(raw: string): { ok: true; count: number } | { ok: false; error: string } {
  const parsed = safeParse<{ version?: number; logs?: BmiLog[] }>(raw);
  if (!parsed || !Array.isArray(parsed.logs)) return { ok: false, error: "รูปแบบไฟล์ไม่ถูกต้อง (ต้องมี logs เป็น array)" };

  // basic validation
  const cleaned = parsed.logs
    .filter(l => l && typeof l.id === "string")
    .map(l => ({ ...l })) as BmiLog[];

  saveLogs(cleaned);
  return { ok: true, count: cleaned.length };
}