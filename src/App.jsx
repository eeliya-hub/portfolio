import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsShowcase from './components/ProjectsShowcase';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import { portfolioData } from './data/portfolio';
import { Moon, Sun } from 'lucide-react';

const sectionList = [
  { id: 'home', Component: Hero },
  { id: 'about', Component: About },
  { id: 'projects', Component: ProjectsShowcase },
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
      const dx = pos.current.x - glow.current.x;
      const dy = pos.current.y - glow.current.y;
      const distance = Math.hypot(dx, dy);
      const smoothFactor = Math.min(0.2, Math.max(0.1, distance / 900));

      glow.current.x = lerp(glow.current.x, pos.current.x, smoothFactor);
      glow.current.y = lerp(glow.current.y, pos.current.y, smoothFactor);

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${(glow.current.x - 150).toFixed(2)}px, ${(glow.current.y - 150).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={glowRef} className="cursor-glow hidden md:block">
      <div className="h-[300px] w-[300px] rounded-full bg-amber-300/[0.15] blur-3xl dark:bg-amber-300/[0.26]" />
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
          <div className="h-24 w-24 rounded-full border-[1.5px] border-amber-300/32 dark:border-amber-300/30" />
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

      {/* Gold ring */}
      <div className="scene-3d absolute top-[60%] left-[18%]">
        <div className="rotate-3d" style={{ animationDuration: '35s' }}>
          <div className="h-14 w-14 rounded-full border-[1.5px] border-yellow-400/24 dark:border-yellow-300/22" />
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
          <div className="h-28 w-28 rounded-full border-[1.5px] border-orange-300/22 dark:border-orange-300/22" />
        </div>
      </div>

      {/* Floating sphere — bottom center */}
      <div className="absolute bottom-[15%] left-[50%] float-gentle" style={{ animationDelay: '-6s', animationDuration: '12s' }}>
        <div className="w-12 h-12 rounded-full glass-object opacity-42 dark:opacity-26" />
      </div>

      {/* Small ring — top right */}
      <div className="scene-3d absolute top-[3%] right-[3%]">
        <div className="rotate-3d-reverse" style={{ animationDuration: '25s' }}>
          <div className="h-10 w-10 rounded-full border-[1.5px] border-yellow-300/22 dark:border-yellow-300/22" />
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
      <div className="orb-1 absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-300/40 via-yellow-200/22 to-transparent blur-3xl dark:from-amber-300/48 dark:via-yellow-200/28" />
      <div className="orb-2 absolute top-[15%] -right-40 h-[550px] w-[550px] rounded-full bg-gradient-to-bl from-orange-300/28 via-amber-200/18 to-transparent blur-3xl dark:from-orange-400/38 dark:via-amber-200/28" />
      <div className="orb-3 absolute bottom-[5%] left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-yellow-200/24 via-amber-100/14 to-transparent blur-3xl dark:from-amber-400/40 dark:via-yellow-200/24" />
      <div className="orb-5 absolute top-[40%] left-[50%] h-[420px] w-[420px] rounded-full bg-gradient-to-tl from-amber-200/24 via-orange-200/14 to-transparent blur-3xl dark:from-orange-300/32 dark:via-amber-200/22" />

      {/* Spark particles — reduced to 5 */}
      <div className="spark spark-1 top-[10%] left-[25%] bg-amber-500/55 dark:bg-amber-200/72" />
      <div className="spark spark-2 top-[30%] left-[75%] bg-yellow-500/42 dark:bg-yellow-200/62" />
      <div className="spark spark-3 top-[55%] left-[40%] bg-orange-400/40 dark:bg-orange-200/66" />
      <div className="spark spark-5 top-[72%] left-[65%] bg-amber-300/36 dark:bg-amber-200/62" />
      <div className="spark spark-9 top-[65%] left-[20%] bg-amber-600/36 dark:bg-orange-200/64" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(180,140,55,0.09)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[radial-gradient(rgba(251,146,60,0.16)_1px,transparent_1px)]" />
    </div>
  );
}

/* ─── Theme toggle — top-right fixed ─── */
function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-5 right-5 z-50 glass-strong rounded-2xl p-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-95"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-amber-700" />
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
    <div className="relative min-h-screen bg-[#f2ebd7] text-stone-900 transition-colors duration-500 dark:bg-[#301c07] dark:text-white">
      <BackgroundEffects />
      <FloatingObjects />
      <CursorGlow />
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Section content with AnimatePresence transitions */}
      <main className="app-main relative z-10 min-h-screen">
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
