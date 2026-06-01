import * as pdfjsLib from "pdfjs-dist";
import type { Question } from "@/data/questions";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;

export async function extractTextFromPDF(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    pages.push(text);
  }
  return pages.join("\n");
}

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    return extractTextFromPDF(file);
  }
  return file.text();
}

export function parseMCQFromText(raw: string): Question[] {
  const text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const questions: Question[] = [];

  const patterns = [
    // Format: "1. Question\nA. opt\nB. opt\nC. opt\nD. opt\nAnswer: A"
    /(\d+)[.)]\s+([\s\S]+?)(?:\n\s*|\s{2,})([Aa])[.)]\s+(.+?)(?:\n\s*|\s{2,})([Bb])[.)]\s+(.+?)(?:\n\s*|\s{2,})([Cc])[.)]\s+(.+?)(?:\n\s*|\s{2,})([Dd])[.)]\s+(.+?)(?:\n\s*(?:Answer|Correct Answer|Ans)[:\s]+([A-Da-d]))?/gm,
    // Format with (A) (B) (C) (D)
    /(\d+)[.)]\s+([\s\S]+?)\(([Aa])\)\s*(.+?)\s*\(([Bb])\)\s*(.+?)\s*\(([Cc])\)\s*(.+?)\s*\(([Dd])\)\s*(.+?)(?:\s*(?:Answer|Correct Answer|Ans)[:\s]+([A-Da-d]))?(?=\n\d+[.)]|\Z)/gm,
  ];

  let usedPattern = false;

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null && questions.length < 500) {
      const [, num, question, ak, ao, bk, bo, ck, co, dk, doo, ans] = match;
      if (!question.trim()) continue;
      questions.push({
        id: parseInt(num),
        question: cleanText(question),
        options: [
          { key: "A", text: cleanText(ao) },
          { key: "B", text: cleanText(bo) },
          { key: "C", text: cleanText(co) },
          { key: "D", text: cleanText(doo) },
        ],
        answer: ans ? ans.toUpperCase() : "A",
      });
      usedPattern = true;
    }
    if (usedPattern && questions.length > 0) break;
  }

  if (questions.length === 0) {
    return parseFlexible(text);
  }

  return deduplicateById(questions);
}

function parseFlexible(text: string): Question[] {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const questions: Question[] = [];
  let i = 0;
  let qId = 1;

  while (i < lines.length) {
    const qMatch = lines[i].match(/^(\d+)[.)]\s+(.+)$/);
    if (!qMatch) { i++; continue; }

    const questionText = [qMatch[2]];
    i++;

    while (i < lines.length && !lines[i].match(/^[A-Da-d][.)]\s+/)) {
      if (lines[i].match(/^\d+[.)]\s+/)) break;
      questionText.push(lines[i]);
      i++;
    }

    const options: { key: string; text: string }[] = [];
    while (i < lines.length && options.length < 4) {
      const optMatch = lines[i].match(/^([A-Da-d])[.)]\s+(.+)$/);
      if (!optMatch) break;
      options.push({ key: optMatch[1].toUpperCase(), text: cleanText(optMatch[2]) });
      i++;
    }

    if (options.length < 2) continue;

    while (options.length < 4) {
      options.push({ key: String.fromCharCode(65 + options.length), text: "N/A" });
    }

    let answer = "A";
    if (i < lines.length) {
      const ansMatch = lines[i].match(/^(?:Answer|Correct Answer|Ans)[:\s]+([A-Da-d])/i);
      if (ansMatch) { answer = ansMatch[1].toUpperCase(); i++; }
    }

    questions.push({
      id: qId++,
      question: cleanText(questionText.join(" ")),
      options,
      answer,
    });
  }

  return questions;
}

function cleanText(s: string): string {
  return s.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").trim();
}

function deduplicateById(qs: Question[]): Question[] {
  const seen = new Set<number>();
  return qs.filter((q) => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}
