import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions as allQuestions } from "@/data/questions";
import type { Question } from "@/data/questions";
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Shield, Clock, BookOpen } from "lucide-react";

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

export default function Quiz() {
  const [screen, setScreen] = useState<Screen>("home");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ q: Question; chosen: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const startQuiz = (count: number) => {
    const shuffled = shuffle(allQuestions)
      .slice(0, count)
      .map(shuffleOptions);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setWrongAnswers([]);
    setTimeLeft(90);
    setTimerActive(true);
    setTotalTime(count * 90);
    setElapsed(0);
    setScreen("quiz");
  };

  useEffect(() => {
    if (!timerActive || screen !== "quiz") return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleTimeout();
          return 90;
        }
        return t - 1;
      });
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, screen, current]);

  const handleTimeout = useCallback(() => {
    if (!revealed) {
      const q = questions[current];
      setWrongAnswers((w) => [...w, { q, chosen: "—" }]);
      setRevealed(true);
      setTimeout(() => goNext(), 1500);
    }
  }, [revealed, questions, current]);

  const handleSelect = (key: string) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
    const q = questions[current];
    if (key === q.answer) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((w) => [...w, { q, chosen: key }]);
    }
  };

  const goNext = () => {
    if (current + 1 >= questions.length) {
      setTimerActive(false);
      setScreen("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setTimeLeft(90);
    }
  };

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const getGrade = () => {
    if (pct >= 90) return { label: "Excellent!", color: "text-emerald-400", desc: "Outstanding performance!" };
    if (pct >= 75) return { label: "Pass", color: "text-cyan-400", desc: "Good understanding of the material." };
    if (pct >= 50) return { label: "Almost", color: "text-yellow-400", desc: "Keep studying — you're getting there!" };
    return { label: "Needs Work", color: "text-red-400", desc: "Review the material and try again." };
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="quiz-root">
      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="home-screen"
          >
            <motion.div
              className="hero-badge"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              <Shield size={40} className="hero-icon" />
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              CSA Exam Prep
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Certified SOC Analyst — Practice MCQ
            </motion.p>

            <motion.div
              className="stats-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="stat-chip"><BookOpen size={14} /> 100 Questions</div>
              <div className="stat-chip"><Clock size={14} /> 90s per question</div>
              <div className="stat-chip"><Trophy size={14} /> Randomised order</div>
            </motion.div>

            <motion.p
              className="home-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Questions and options are shuffled for every session — just like the real exam. Choose how many questions you want to attempt.
            </motion.p>

            <motion.div
              className="mode-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {[
                { n: 10, label: "Quick Test", desc: "~15 min" },
                { n: 25, label: "Practice Set", desc: "~37 min" },
                { n: 50, label: "Half Exam", desc: "~75 min" },
                { n: 100, label: "Full Exam", desc: "~150 min" },
              ].map(({ n, label, desc }) => (
                <motion.button
                  key={n}
                  className="mode-card"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => startQuiz(n)}
                >
                  <span className="mode-count">{n}</span>
                  <span className="mode-label">{label}</span>
                  <span className="mode-desc">{desc}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

        {screen === "quiz" && questions.length > 0 && (
          <motion.div
            key={`quiz-${current}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="quiz-screen"
          >
            <div className="quiz-header">
              <div className="progress-wrap">
                <div className="progress-info">
                  <span className="q-counter">Question {current + 1} <span className="q-total">/ {questions.length}</span></span>
                  <span className="q-score">Score: {score}</span>
                </div>
                <div className="progress-bar-track">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className={`timer-ring ${timeLeft <= 15 ? "timer-urgent" : timeLeft <= 30 ? "timer-warn" : ""}`}>
                <svg viewBox="0 0 44 44" className="ring-svg">
                  <circle cx="22" cy="22" r="18" className="ring-bg" />
                  <motion.circle
                    cx="22" cy="22" r="18"
                    className="ring-fg"
                    strokeDasharray="113.1"
                    strokeDashoffset={113.1 - (timeLeft / 90) * 113.1}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>
                <span className="timer-text">{timeLeft}</span>
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
                  <motion.button
                    key={opt.key}
                    className={`option-btn option-${state}`}
                    onClick={() => handleSelect(opt.key)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={!revealed ? { scale: 1.02 } : {}}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                    disabled={revealed}
                  >
                    <span className="opt-key">{opt.key}</span>
                    <span className="opt-text">{opt.text}</span>
                    {revealed && isCorrect && <CheckCircle size={18} className="opt-icon correct-icon" />}
                    {revealed && isSelected && !isCorrect && <XCircle size={18} className="opt-icon wrong-icon" />}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  className="reveal-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`answer-badge ${selected === questions[current].answer ? "correct-badge" : "wrong-badge"}`}>
                    {selected === questions[current].answer ? (
                      <><CheckCircle size={16} /> Correct!</>
                    ) : (
                      <><XCircle size={16} /> Incorrect — Answer: <strong>{questions[current].answer}</strong></>
                    )}
                  </div>
                  <motion.button
                    className="next-btn"
                    onClick={goNext}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {current + 1 >= questions.length ? "See Results" : "Next Question"}
                    <ChevronRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {screen === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="result-screen"
          >
            <motion.div
              className="trophy-wrap"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              <Trophy size={48} className="trophy-icon" />
            </motion.div>

            <motion.div
              className="score-circle"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <span className="score-pct">{pct}%</span>
              <span className="score-raw">{score} / {questions.length}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <p className={`grade-label ${getGrade().color}`}>{getGrade().label}</p>
              <p className="grade-desc">{getGrade().desc}</p>
            </motion.div>

            <motion.div
              className="result-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <div className="rstat"><CheckCircle size={16} className="text-emerald-400" /><span>Correct: {score}</span></div>
              <div className="rstat"><XCircle size={16} className="text-red-400" /><span>Wrong: {wrongAnswers.length}</span></div>
              <div className="rstat"><Clock size={16} className="text-cyan-400" /><span>Time: {formatTime(elapsed)}</span></div>
            </motion.div>

            {wrongAnswers.length > 0 && (
              <motion.div
                className="review-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <h3 className="review-title">Review Incorrect Answers</h3>
                <div className="review-list">
                  {wrongAnswers.map(({ q, chosen }, i) => (
                    <motion.div
                      key={i}
                      className="review-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.04 }}
                    >
                      <p className="review-q"><span className="review-qnum">Q{q.id}</span> {q.question}</p>
                      <div className="review-answers">
                        <span className="review-wrong">
                          <XCircle size={13} /> Your answer: {chosen !== "—" ? `${chosen}. ${q.options.find(o => o.key === chosen)?.text ?? chosen}` : "Timed out"}
                        </span>
                        <span className="review-correct">
                          <CheckCircle size={13} /> Correct: {q.answer}. {q.options.find(o => o.key === q.answer)?.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              className="result-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="action-btn primary-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startQuiz(questions.length)}
              >
                <RotateCcw size={16} /> Retry Same Length
              </motion.button>
              <motion.button
                className="action-btn secondary-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setScreen("home")}
              >
                <Shield size={16} /> Back to Home
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
