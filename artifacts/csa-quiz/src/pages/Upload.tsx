import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Play, X } from "lucide-react";
import { extractTextFromFile, parseMCQFromText } from "@/lib/pdfParser";
import type { Question } from "@/data/questions";

interface Props {
  onStart: (questions: Question[], title: string) => void;
  onBack: () => void;
}

type State = "idle" | "parsing" | "preview" | "error";

export default function UploadScreen({ onStart, onBack }: Props) {
  const [state, setState] = useState<State>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    const allowed = ["application/pdf", "text/plain"];
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowed.includes(file.type) && !["pdf", "txt"].includes(ext)) {
      setError("Only PDF and TXT files are supported.");
      setState("error");
      return;
    }

    setFileName(file.name);
    setState("parsing");
    setProgress(0);

    try {
      const ticker = setInterval(() => setProgress((p) => Math.min(p + 8, 85)), 200);
      const text = await extractTextFromFile(file);
      clearInterval(ticker);
      setProgress(95);

      const parsed = parseMCQFromText(text);
      setProgress(100);

      if (parsed.length === 0) {
        setError("No MCQ questions detected. Make sure the file has numbered questions (1. / 1) with options A/B/C/D.");
        setState("error");
        return;
      }

      setQuestions(parsed);
      setState("preview");
    } catch (e) {
      setError(`Failed to parse file: ${e instanceof Error ? e.message : "Unknown error"}`);
      setState("error");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setState("idle");
    setQuestions([]);
    setError("");
    setFileName("");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const title = fileName.replace(/\.(pdf|txt)$/i, "").replace(/[-_]/g, " ") || "Custom Quiz";

  return (
    <div className="upload-root">
      <motion.button
        className="back-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3 }}
      >
        <ArrowLeft size={16} /> Back
      </motion.button>

      <motion.div
        className="upload-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="upload-icon-wrap">
          <Upload size={28} className="upload-icon" />
        </div>
        <h2 className="upload-title">Upload Your Study Material</h2>
        <p className="upload-subtitle">
          Drop a PDF or TXT file with MCQ questions — the parser will auto-detect numbered questions with A/B/C/D options.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="drop"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`drop-zone ${dragOver ? "drop-zone-active" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" accept=".pdf,.txt" className="hidden-input" onChange={handleFileChange} />
            <motion.div
              animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
              className="drop-inner"
            >
              <FileText size={40} className="drop-file-icon" />
              <p className="drop-main">Drag & drop your file here</p>
              <p className="drop-sub">or click to browse</p>
              <div className="drop-formats">
                <span className="format-tag">PDF</span>
                <span className="format-tag">TXT</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {state === "parsing" && (
          <motion.div
            key="parsing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="parsing-card"
          >
            <p className="parsing-name">{fileName}</p>
            <div className="parsing-bar-track">
              <motion.div
                className="parsing-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="parsing-label">
              {progress < 60 ? "Extracting text…" : progress < 90 ? "Parsing questions…" : "Finalising…"}
            </p>
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="error-card"
          >
            <AlertCircle size={32} className="error-icon" />
            <p className="error-msg">{error}</p>
            <div className="format-guide">
              <p className="format-guide-title">Expected format:</p>
              <pre className="format-example">{`1. Which tool is used for log correlation?
A. Splunk   B. Nmap   C. Burp Suite   D. Wireshark
Answer: A`}</pre>
            </div>
            <button className="retry-btn" onClick={reset}>
              <X size={14} /> Try another file
            </button>
          </motion.div>
        )}

        {state === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="preview-card"
          >
            <div className="preview-header">
              <CheckCircle size={22} className="preview-check" />
              <div>
                <p className="preview-name">{fileName}</p>
                <p className="preview-count">{questions.length} questions detected</p>
              </div>
              <button className="preview-reset" onClick={reset}><X size={14} /></button>
            </div>

            <div className="preview-list">
              {questions.slice(0, 5).map((q, i) => (
                <motion.div
                  key={i}
                  className="preview-q"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="preview-qnum">Q{q.id}</span>
                  <span className="preview-qtext">{q.question.slice(0, 90)}{q.question.length > 90 ? "…" : ""}</span>
                </motion.div>
              ))}
              {questions.length > 5 && (
                <p className="preview-more">+ {questions.length - 5} more questions</p>
              )}
            </div>

            <div className="preview-mode-grid">
              {([
                questions.length >= 10 && { n: Math.min(10, questions.length), label: "Quick Test" },
                questions.length >= 25 && { n: Math.min(25, questions.length), label: "Practice Set" },
                { n: questions.length, label: "Full Set" },
              ] as ({ n: number; label: string } | false)[])
                .filter(Boolean)
                .map((m) => {
                  const mode = m as { n: number; label: string };
                  return (
                    <motion.button
                      key={mode.n}
                      className="mode-card"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onStart(questions.slice(0, mode.n), title)}
                    >
                      <Play size={14} />
                      <span className="mode-label">{mode.label}</span>
                      <span className="mode-desc">{mode.n} questions</span>
                    </motion.button>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="format-tips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="format-tips-title">Supported MCQ formats</p>
        <div className="format-examples">
          <div className="fmt-example">
            <span className="fmt-label">Numbered + lettered</span>
            <code>1. Question<br />A. opt  B. opt<br />Answer: A</code>
          </div>
          <div className="fmt-example">
            <span className="fmt-label">Parenthesised options</span>
            <code>1) Question<br />(A) opt (B) opt<br />Correct: B</code>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
