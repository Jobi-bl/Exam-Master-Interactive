import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "@/pages/Quiz";
import UploadScreen from "@/pages/Upload";
import { listSessions, deleteSession, formatRelativeTime } from "@/lib/storage";
import type { SavedSession } from "@/lib/storage";
import type { Question } from "@/data/questions";
import { Shield, Upload, Play, Trash2, Clock, BookOpen } from "lucide-react";

type AppScreen = "home" | "upload" | "quiz";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [sessions, setSessions] = useState<SavedSession[]>(() => listSessions());
  const [resumeSession, setResumeSession] = useState<SavedSession | null>(null);
  const [uploadedQuestions, setUploadedQuestions] = useState<Question[] | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");

  const refreshSessions = () => setSessions(listSessions());

  const handleDelete = (id: string) => {
    deleteSession(id);
    refreshSessions();
  };

  const handleStartUpload = (questions: Question[], title: string) => {
    setUploadedQuestions(questions);
    setUploadTitle(title);
    setResumeSession(null);
    setScreen("quiz");
  };

  const handleResume = (s: SavedSession) => {
    setResumeSession(s);
    setUploadedQuestions(null);
    setScreen("quiz");
  };

  const handleNewQuiz = () => {
    setResumeSession(null);
    setUploadedQuestions(null);
    setScreen("quiz");
  };

  if (screen === "upload") {
    return (
      <UploadScreen
        onStart={handleStartUpload}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "quiz") {
    return (
      <Quiz
        initialSession={resumeSession}
        initialQuestions={uploadedQuestions}
        initialTitle={uploadTitle || undefined}
        source={uploadedQuestions ? "upload" : "builtin"}
        onHome={() => { setScreen("home"); refreshSessions(); }}
      />
    );
  }

  return (
    <div className="quiz-root">
      <motion.div className="home-screen" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>

        <motion.div className="hero-badge" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
          <Shield size={40} className="hero-icon" />
        </motion.div>
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          CSA Exam Prep
        </motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Certified SOC Analyst — Practice MCQ
        </motion.p>
        <motion.div className="stats-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="stat-chip"><BookOpen size={13} /> 100 Questions</div>
          <div className="stat-chip"><Clock size={13} /> 90s / question</div>
          <div className="stat-chip"><Shield size={13} /> Smart Tips</div>
        </motion.div>

        {/* Saved sessions */}
        <AnimatePresence>
          {sessions.length > 0 && (
            <motion.div className="saved-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <p className="saved-title">Continue where you left off</p>
              <div className="saved-list">
                {sessions.map((s, i) => (
                  <motion.div key={s.id} className="saved-card" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + i * 0.05 }}>
                    <div className="saved-info">
                      <span className="saved-name">{s.title}</span>
                      <span className="saved-meta">Q{s.current + 1}/{s.totalQuestions} · {formatRelativeTime(s.savedAt)}</span>
                      <div className="saved-progress-track">
                        <div className="saved-progress-fill" style={{ width: `${Math.round((s.current / s.totalQuestions) * 100)}%` }} />
                      </div>
                    </div>
                    <div className="saved-actions">
                      <motion.button className="resume-btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => handleResume(s)}>
                        <Play size={13} /> Resume
                      </motion.button>
                      <motion.button className="delete-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(s.id)}>
                        <Trash2 size={13} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode grid */}
        <motion.div className="mode-grid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          {[
            { n: 10, label: "Quick Test", desc: "~15 min" },
            { n: 25, label: "Practice Set", desc: "~37 min" },
            { n: 50, label: "Half Exam", desc: "~75 min" },
            { n: 100, label: "Full Exam", desc: "~150 min" },
          ].map(({ n, label, desc }) => (
            <motion.button key={n} className="mode-card" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} onClick={handleNewQuiz}>
              <span className="mode-count">{n}</span>
              <span className="mode-label">{label}</span>
              <span className="mode-desc">{desc}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Upload button */}
        <motion.button className="upload-start-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setScreen("upload")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Upload size={15} /> Upload PDF / TXT to generate your own quiz
        </motion.button>

      </motion.div>
    </div>
  );
}
