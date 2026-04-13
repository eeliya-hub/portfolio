import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import { portfolioData } from './data/portfolio';
import { Moon, Sun } from 'lucide-react';

const sectionList = [
  { id: 'home', Component: Hero },
  { id: 'about', Component: About },
  { id: 'projects', Component: Projects },
  { id: 'skills', Component: Skills },
  { id: 'journey', Component: Experience },
  { id: 'contact', Component: Contact },
];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.localStorage.getItem('eeliya-portfolio-theme') || 'dark';
}

/* ─── Glow blob that follows cursor — no custom cursor replacement ─── */
function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(!reduceMotion.matches && finePointer.matches);

    update();
    reduceMotion.addEventListener('change', update);
    finePointer.addEventListener('change', update);
    return () => {
      reduceMotion.removeEventListener('change', update);
      finePointer.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      glow.current.x = lerp(glow.current.x, pos.current.x, 0.12);
      glow.current.y = lerp(glow.current.y, pos.current.y, 0.12);
      if (glowRef.current) glowRef.current.style.transform = `translate(${glow.current.x - 150}px, ${glow.current.y - 150}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={glowRef} className="cursor-glow hidden md:block">
      <div className="h-[300px] w-[300px] rounded-full bg-indigo-400/[0.06] dark:bg-indigo-500/[0.10] blur-3xl" />
    </div>
  );
}

/* ─── Floating glass objects (CSS only, no backdrop-filter) ─── */
function FloatingObjects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* 3D prism */}
      <div className="scene-3d absolute top-[8%] right-[10%]">
        <div className="rotate-3d w-20 h-20 relative" style={{ animationDuration: '24s' }}>
          <div className="absolute inset-0 rounded-xl glass-object opacity-50 dark:opacity-30" style={{ transform: 'translateZ(40px)' }} />
          <div className="absolute inset-0 rounded-xl glass-object opacity-35 dark:opacity-20" style={{ transform: 'rotateY(90deg) translateZ(40px)' }} />
        </div>
      </div>

      {/* Spinning ring */}
      <div className="scene-3d absolute bottom-[20%] left-[5%]">
        <div className="rotate-3d-reverse" style={{ animationDuration: '30s' }}>
          <div className="w-24 h-24 rounded-full border-[1.5px] border-purple-500/50 dark:border-purple-400/30" />
        </div>
      </div>

      {/* Glass diamond */}
      <div className="scene-3d absolute top-[48%] right-[6%]">
        <div className="rotate-3d" style={{ animationDuration: '16s' }}>
          <div className="w-12 h-12 rotate-45 rounded-lg glass-object opacity-50 dark:opacity-28" />
        </div>
      </div>

      {/* Soft sphere */}
      <div className="absolute top-[30%] left-[7%] float-gentle">
        <div className="w-16 h-16 rounded-full glass-object opacity-45 dark:opacity-25" />
      </div>

      {/* Glass pill */}
      <div className="absolute top-[18%] left-[42%] float-gentle" style={{ animationDelay: '-4s', animationDuration: '8s' }}>
        <div className="w-20 h-8 rounded-full glass-object opacity-38 dark:opacity-22" />
      </div>

      {/* Cyan ring */}
      <div className="scene-3d absolute top-[60%] left-[18%]">
        <div className="rotate-3d" style={{ animationDuration: '35s' }}>
          <div className="w-14 h-14 rounded-full border-[1.5px] border-cyan-500/40 dark:border-cyan-400/25" />
        </div>
      </div>

      {/* Spinning diamond — bottom right */}
      <div className="scene-3d absolute bottom-[8%] right-[12%]">
        <div className="rotate-3d" style={{ animationDuration: '22s' }}>
          <div className="w-10 h-10 rotate-45 rounded-lg glass-object opacity-45 dark:opacity-28" />
        </div>
      </div>

      {/* Large ring */}
      <div className="scene-3d absolute top-[42%] left-[2%]">
        <div className="rotate-3d" style={{ animationDuration: '40s' }}>
          <div className="w-28 h-28 rounded-full border-[1.5px] border-indigo-400/35 dark:border-indigo-400/25" />
        </div>
      </div>

      {/* Floating sphere — bottom center */}
      <div className="absolute bottom-[15%] left-[50%] float-gentle" style={{ animationDelay: '-6s', animationDuration: '12s' }}>
        <div className="w-12 h-12 rounded-full glass-object opacity-42 dark:opacity-26" />
      </div>

      {/* Small ring — top right */}
      <div className="scene-3d absolute top-[3%] right-[3%]">
        <div className="rotate-3d-reverse" style={{ animationDuration: '25s' }}>
          <div className="w-10 h-10 rounded-full border-[1.5px] border-rose-500/38 dark:border-rose-400/25" />
        </div>
      </div>
    </div>
  );
}

/* ─── Background effects ─── */
function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient orbs — reduced to 4 for performance */}
      <div className="orb-1 absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/45 via-purple-400/30 to-transparent blur-3xl dark:from-indigo-500/30 dark:via-purple-400/22" />
      <div className="orb-2 absolute top-[15%] -right-40 h-[550px] w-[550px] rounded-full bg-gradient-to-bl from-pink-400/38 via-rose-300/25 to-transparent blur-3xl dark:from-pink-500/25 dark:via-rose-400/18" />
      <div className="orb-3 absolute bottom-[5%] left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-400/35 via-blue-300/22 to-transparent blur-3xl dark:from-cyan-500/25 dark:via-blue-400/18" />
      <div className="orb-5 absolute top-[40%] left-[50%] h-[420px] w-[420px] rounded-full bg-gradient-to-tl from-violet-400/35 via-fuchsia-300/22 to-transparent blur-3xl dark:from-violet-500/22 dark:via-fuchsia-400/16" />

      {/* Spark particles — reduced to 5 */}
      <div className="spark spark-1 top-[10%] left-[25%] bg-indigo-500/80 dark:bg-indigo-400/60" />
      <div className="spark spark-2 top-[30%] left-[75%] bg-pink-500/70 dark:bg-pink-400/55" />
      <div className="spark spark-3 top-[55%] left-[40%] bg-cyan-500/70 dark:bg-cyan-400/55" />
      <div className="spark spark-5 top-[72%] left-[65%] bg-blue-500/70 dark:bg-blue-400/55" />
      <div className="spark spark-9 top-[65%] left-[20%] bg-violet-500/70 dark:bg-violet-400/55" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.14)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[radial-gradient(rgba(99,102,241,0.1)_1px,transparent_1px)]" />
    </div>
  );
}

/* ─── Theme toggle — top-right fixed ─── */
function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-5 right-5 z-50 glass-strong rounded-2xl p-3 transition-all duration-300 hover:scale-110 active:scale-95"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-500" />
      )}
    </button>
  );
}

/* Page transition variants */
const pageVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('eeliya-portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  const handleNavigate = useCallback((id) => setActiveSection(id), []);

  const ActiveComponent = sectionList.find((s) => s.id === activeSection)?.Component || Hero;

  return (
    <div className="relative min-h-screen bg-[#dde0ed] text-gray-900 transition-colors duration-500 dark:bg-[#08080f] dark:text-white">
      <BackgroundEffects />
      <FloatingObjects />
      <CursorGlow />
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Section content with AnimatePresence transitions */}
      <main className="relative z-10 min-h-screen pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <ActiveComponent
              portfolioData={portfolioData}
              onNavigate={handleNavigate}
              onOpenProject={setActiveProject}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
