import type { Question } from "@/data/questions";

export interface WrongAnswer {
  q: Question;
  chosen: string;
}

export interface SavedSession {
  id: string;
  title: string;
  source: "builtin" | "upload";
  savedAt: number;
  questions: Question[];
  current: number;
  score: number;
  wrongAnswers: WrongAnswer[];
  elapsed: number;
  totalQuestions: number;
}

const KEY = "csa-quiz-sessions";

export function listSessions(): SavedSession[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSession(session: SavedSession): void {
  const sessions = listSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) sessions[idx] = session;
  else sessions.unshift(session);
  localStorage.setItem(KEY, JSON.stringify(sessions.slice(0, 10)));
}

export function deleteSession(id: string): void {
  const sessions = listSessions().filter((s) => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

export function getSession(id: string): SavedSession | null {
  return listSessions().find((s) => s.id === id) ?? null;
}

export function makeSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return "just now";
}
