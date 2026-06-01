import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions as allQuestions } from "@/data/questions";
import type { Question } from "@/data/questions";
import { generateTip, getTopicBreakdown } from "@/lib/tips";
import { saveSession, deleteSession, makeSessionId } from "@/lib/storage";
import type { SavedSession, WrongAnswer } from "@/lib/storage";
import {
  CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Shield,
  Clock, BookOpen, Save, Play, BarChart2, Lightbulb, Zap, ChevronDown, ChevronUp,
} from "lucide-react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q: Question): Question {
  return { ...q, options: shuffle(q.options) };
}

type Screen = "home" | "quiz" | "result";

interface Props {
  initialSession?: SavedSession | null;
  initialQuestions?: Question[] | null;
  initialTitle?: string;
  source?: "builtin" | "upload";
  onHome?: () => void;
}

export default function Quiz({ initialSession, initialQuestions, initialTitle, source = "builtin", onHome }: Props) {
  const [screen, setScreen] = useState<Screen>(initialSession || initialQuestions ? "quiz" : "home");
  const [questions, setQuestions] = useState<Question[]>(
    initialSession?.questions ?? (initialQuestions ? initialQuestions.map(shuffleOptions) : [])
  );
  const [sessionId] = useState(() => initialSession?.id ?? makeSessionId());
  const [sessionTitle, setSessionTitle] = useState(initialSession?.title ?? initialTitle ?? "CSA Quiz");
  const [current, setCurrent] = useState(initialSession?.current ?? 0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(initialSession?.score ?? 0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>(initialSession?.wrongAnswers ?? []);
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerActive, setTimerActive] = useState(!!(initialSession || initialQuestions));
  const [elapsed, setElapsed] = useState(initialSession?.elapsed ?? 0);
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [expandedTips, setExpandedTips] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startQuiz = (count: number, title: string) => {
    const shuffled = shuffle(allQuestions).slice(0, count).map(shuffleOptions);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setWrongAnswers([]);
    setTimeLeft(90);
    setTimerActive(true);
    setElapsed(0);
    setSessionTitle(title);
    setScreen("quiz");
  };

  const persistSession = useCallback(
    (overrides: Partial<SavedSession> = {}) => {
      saveSession({
        id: sessionId,
        title: sessionTitle,
        source,
        savedAt: Date.now(),
        questions,
        current,
        score,
        wrongAnswers,
        elapsed,
        totalQuestions: questions.length,
        ...overrides,
      });
      setSavedIndicator(true);
      setTimeout(() => setSavedIndicator(false), 1800);
    },
    [sessionId, sessionTitle, source, questions, current, score, wrongAnswers, elapsed]
  );

  useEffect(() => {
    if (screen !== "quiz" || !timerActive) return;
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
      setTimeLeft((t) => {
        if (t <= 1) {
          handleTimeout();
          return 90;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, screen, current]);

  const handleTimeout = useCallback(() => {
    if (!revealed) {
      const q = questions[current];
      setWrongAnswers((w) => [...w, { q, chosen: "—" }]);
      setRevealed(true);
      setTimeout(() => goNext(), 1800);
    }
  }, [revealed, questions, current]);

  const handleSelect = (key: string) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
    const q = questions[current];
    const isRight = key === q.answer;
    const newScore = isRight ? score + 1 : score;
    const newWrong = isRight ? wrongAnswers : [...wrongAnswers, { q, chosen: key }];
    if (isRight) setScore((s) => s + 1);
    else setWrongAnswers((w) => [...w, { q, chosen: key }]);
    persistSession({ score: newScore, wrongAnswers: newWrong, current, elapsed });
  };

  const goNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (current + 1 >= questions.length) {
      setTimerActive(false);
      deleteSession(sessionId);
      setScreen("result");
    } else {
      const next = current + 1;
      setCurrent(next);
      setSelected(null);
      setRevealed(false);
      setTimeLeft(90);
      persistSession({ current: next });
    }
  };

  const toggleTip = (id: number) => {
    setExpandedTips((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const topicBreakdown = getTopicBreakdown(questions, wrongAnswers);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const getGrade = () => {
    if (pct >= 90) return { label: "Excellent!", color: "text-emerald-400", bar: "#10b981" };
    if (pct >= 75) return { label: "Pass", color: "text-cyan-400", bar: "#06b6d4" };
    if (pct >= 50) return { label: "Almost There", color: "text-yellow-400", bar: "#f59e0b" };
    return { label: "Keep Studying", color: "text-red-400", bar: "#ef4444" };
  };

  return (
    <div className="quiz-root">
      <AnimatePresence mode="wait">

        {/* ──── HOME ──── */}
        {screen === "home" && (
          <motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="home-screen">
            <motion.div className="hero-badge" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
              <Shield size={40} className="hero-icon" />
            </motion.div>
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              CSA Exam Prep
            </motion.h1>
            <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Certified SOC Analyst — Practice MCQ
            </motion.p>
            <motion.div className="stats-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <div className="stat-chip"><BookOpen size={13} /> 100 Questions</div>
              <div className="stat-chip"><Clock size={13} /> 90s / question</div>
              <div className="stat-chip"><Trophy size={13} /> Randomised</div>
            </motion.div>
            <motion.div className="mode-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              {[
                { n: 10, label: "Quick Test", desc: "~15 min" },
                { n: 25, label: "Practice Set", desc: "~37 min" },
                { n: 50, label: "Half Exam", desc: "~75 min" },
                { n: 100, label: "Full Exam", desc: "~150 min" },
              ].map(({ n, label, desc }) => (
                <motion.button key={n} className="mode-card" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => startQuiz(n, `CSA Quiz — ${label}`)}>
                  <span className="mode-count">{n}</span>
                  <span className="mode-label">{label}</span>
                  <span className="mode-desc">{desc}</span>
                </motion.button>
              ))}
            </motion.div>
            {onHome && (
              <motion.button className="upload-start-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onHome} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                Upload PDF / TXT to generate a quiz
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ──── QUIZ ──── */}
        {screen === "quiz" && questions.length > 0 && (
          <motion.div key={`quiz-${current}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }} className="quiz-screen">

            <div className="quiz-header">
              <div className="progress-wrap">
                <div className="progress-info">
                  <span className="q-counter">Q {current + 1} <span className="q-total">/ {questions.length}</span></span>
                  <span className="q-session-title">{sessionTitle}</span>
                  <span className="q-score">✓ {score}</span>
                </div>
                <div className="progress-bar-track">
                  <motion.div className="progress-bar-fill" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>
              <div className="header-right">
                <motion.button className={`save-btn ${savedIndicator ? "save-btn-saved" : ""}`} onClick={() => persistSession()} whileTap={{ scale: 0.92 }} title="Save & continue later">
                  <Save size={13} /> {savedIndicator ? "Saved!" : "Save"}
                </motion.button>
                <div className={`timer-ring ${timeLeft <= 15 ? "timer-urgent" : timeLeft <= 30 ? "timer-warn" : ""}`}>
                  <svg viewBox="0 0 44 44" className="ring-svg">
                    <circle cx="22" cy="22" r="18" className="ring-bg" />
                    <motion.circle cx="22" cy="22" r="18" className="ring-fg" strokeDasharray="113.1" strokeDashoffset={113.1 - (timeLeft / 90) * 113.1} transition={{ duration: 1, ease: "linear" }} />
                  </svg>
                  <span className="timer-text">{timeLeft}</span>
                </div>
              </div>
            </div>

            <div className="question-card">
              <div className="q-number-badge">Q{questions[current].id}</div>
              <p className="question-text">{questions[current].question}</p>
            </div>

            <div className="options-grid">
              {questions[current].options.map((opt, i) => {
                const isCorrect = opt.key === questions[current].answer;
                const isSelected = opt.key === selected;
                let state = "idle";
                if (revealed) {
                  if (isCorrect) state = "correct";
                  else if (isSelected) state = "wrong";
                  else state = "dim";
                }
                return (
                  <motion.button key={opt.key} className={`option-btn option-${state}`} onClick={() => handleSelect(opt.key)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={!revealed ? { scale: 1.02 } : {}} whileTap={!revealed ? { scale: 0.98 } : {}} disabled={revealed}>
                    <span className="opt-key">{opt.key}</span>
                    <span className="opt-text">{opt.text}</span>
                    {revealed && isCorrect && <CheckCircle size={16} className="opt-icon correct-icon" />}
                    {revealed && isSelected && !isCorrect && <XCircle size={16} className="opt-icon wrong-icon" />}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div className="reveal-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className={`answer-badge ${selected === questions[current].answer ? "correct-badge" : "wrong-badge"}`}>
                    {selected === questions[current].answer
                      ? <><CheckCircle size={14} /> Correct!</>
                      : <><XCircle size={14} /> Incorrect — Answer: <strong>{questions[current].answer}</strong></>}
                  </div>
                  <motion.button className="next-btn" onClick={goNext} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    {current + 1 >= questions.length ? "See Results" : "Next"} <ChevronRight size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ──── RESULT + ANALYSIS ──── */}
        {screen === "result" && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="result-screen">

            {/* Score */}
            <motion.div className="trophy-wrap" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.1, type: "spring" }}>
              <Trophy size={40} className="trophy-icon" />
            </motion.div>
            <motion.div className="score-circle" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring" }}>
              <span className="score-pct">{pct}%</span>
              <span className="score-raw">{score} / {questions.length}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <p className={`grade-label ${getGrade().color}`}>{getGrade().label}</p>
            </motion.div>
            <motion.div className="result-stats" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <div className="rstat"><CheckCircle size={14} className="text-emerald-400" /><span>Correct: {score}</span></div>
              <div className="rstat"><XCircle size={14} className="text-red-400" /><span>Wrong: {wrongAnswers.length}</span></div>
              <div className="rstat"><Clock size={14} className="text-cyan-400" /><span>Time: {formatTime(elapsed)}</span></div>
            </motion.div>

            {/* Topic Breakdown */}
            {topicBreakdown.length > 0 && (
              <motion.div className="topic-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h3 className="section-title"><BarChart2 size={15} /> Topic Breakdown</h3>
                <div className="topic-list">
                  {topicBreakdown.map((t, i) => (
                    <motion.div key={t.topic} className="topic-row" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.04 }}>
                      <div className="topic-meta">
                        <span className="topic-name">{t.topic}</span>
                        <span className={`topic-pct ${t.pct < 50 ? "pct-bad" : t.pct < 75 ? "pct-ok" : "pct-good"}`}>{t.pct}%</span>
                      </div>
                      <div className="topic-bar-track">
                        <motion.div
                          className={`topic-bar-fill ${t.pct < 50 ? "bar-bad" : t.pct < 75 ? "bar-ok" : "bar-good"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${t.pct}%` }}
                          transition={{ delay: 0.5 + i * 0.04, duration: 0.6 }}
                        />
                      </div>
                      <span className="topic-counts">{t.total - t.wrong}/{t.total}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Wrong answers + tips */}
            {wrongAnswers.length > 0 && (
              <motion.div className="review-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h3 className="section-title"><Lightbulb size={15} /> Wrong Answers + Memory Tips</h3>
                <div className="review-list">
                  {wrongAnswers.map(({ q, chosen }, i) => {
                    const tip = generateTip(q, chosen);
                    const open = expandedTips.has(q.id);
                    const correctOpt = q.options.find((o) => o.key === q.answer);
                    const chosenOpt = q.options.find((o) => o.key === chosen);
                    return (
                      <motion.div key={i} className="review-item" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.04 }}>
                        <button className="review-q-btn" onClick={() => toggleTip(q.id)}>
                          <span className="review-qnum">Q{q.id}</span>
                          <span className="review-q-text">{q.question.slice(0, 100)}{q.question.length > 100 ? "…" : ""}</span>
                          {open ? <ChevronUp size={14} className="chevron-icon" /> : <ChevronDown size={14} className="chevron-icon" />}
                        </button>

                        <div className="review-answers-row">
                          <span className="review-wrong-ans">
                            <XCircle size={12} />
                            {chosen !== "—" ? `${chosen}. ${chosenOpt?.text ?? chosen}` : "Timed out"}
                          </span>
                          <span className="review-correct-ans">
                            <CheckCircle size={12} />
                            {q.answer}. {correctOpt?.text}
                          </span>
                        </div>

                        {/* Flash key always visible */}
                        <div className="flash-key">
                          <Zap size={12} className="flash-icon" />
                          <span className="flash-text">{tip.flash}</span>
                          <span className="topic-badge">{tip.topic}</span>
                        </div>

                        {/* Full tip collapsible */}
                        <AnimatePresence>
                          {open && (
                            <motion.div className="tip-expand" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                              <div className="tip-mnemonic">
                                <Lightbulb size={13} className="tip-bulb" />
                                <p>{tip.mnemonic}</p>
                              </div>
                              <div className="tip-hook">
                                <span className="tip-hook-label">Hook in question →</span>
                                <span className="tip-hook-text">"{tip.hook}"</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div className="result-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <motion.button className="action-btn primary-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => { setScreen("home"); setQuestions([]); setScore(0); setWrongAnswers([]); setElapsed(0); setCurrent(0); }}>
                <Play size={14} /> New Quiz
              </motion.button>
              {source === "upload" && initialQuestions && (
                <motion.button className="action-btn secondary-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => {
                  const reshuffled = shuffle(initialQuestions!).map(shuffleOptions);
                  setQuestions(reshuffled);
                  setCurrent(0); setSelected(null); setRevealed(false);
                  setScore(0); setWrongAnswers([]); setTimeLeft(90);
                  setTimerActive(true); setElapsed(0); setScreen("quiz");
                }}>
                  <RotateCcw size={14} /> Retry Upload
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
