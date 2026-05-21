import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import { portfolioData } from './data/portfolio';
import { Moon, Sun } from 'lucide-react';
import { EtheralShadow } from './components/ui/etheral-shadow';

const sectionLoaders = {
  about: () => import('./components/About'),
  projects: () => import('./components/Projects'),
  skills: () => import('./components/Skills'),
  journey: () => import('./components/Experience'),
  contact: () => import('./components/Contact'),
};

const modalLoader = () => import('./components/ProjectModal');

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.localStorage.getItem('eeliya-portfolio-theme') || 'dark';
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
        <Moon className="h-5 w-5 text-indigo-500" />
      )}
    </button>
  );
}

/* Page transition variants */
const pageVariants = {
  enter: { opacity: 0, y: 14, scale: 0.992 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.995 },
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [sectionComponents, setSectionComponents] = useState(() => ({ home: Hero }));
  const [ProjectModalComponent, setProjectModalComponent] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('eeliya-portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  const cacheSection = useCallback((id, Component) => {
    setSectionComponents((current) => {
      if (current[id]) return current;
      return { ...current, [id]: Component };
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const warmSections = () => {
      Object.entries(sectionLoaders).forEach(([id, load]) => {
        void load().then((mod) => {
          if (cancelled) return;
          cacheSection(id, mod.default);
        });
      });

      void modalLoader().then((mod) => {
        if (cancelled) return;
        setProjectModalComponent(() => mod.default);
      });
    };

    const frameId = window.requestAnimationFrame(warmSections);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [cacheSection]);

  const handleNavigate = useCallback((id) => {
    if (id === activeSection) return;

    if (id === 'home' || sectionComponents[id]) {
      setActiveSection(id);
      return;
    }

    const load = sectionLoaders[id];
    if (!load) return;

    void load().then((mod) => {
      cacheSection(id, mod.default);
      setActiveSection(id);
    });
  }, [activeSection, cacheSection, sectionComponents]);

  const handleOpenProject = useCallback((project) => {
    if (ProjectModalComponent) {
      setActiveProject(project);
      return;
    }

    void modalLoader().then((mod) => {
      setProjectModalComponent(() => mod.default);
      setActiveProject(project);
    });
  }, [ProjectModalComponent]);

  const ActiveComponent = sectionComponents[activeSection] || Hero;
  const backgroundConfig = useMemo(
    () => ({
      color: theme === 'dark' ? 'rgba(166, 166, 166, 0.92)' : 'rgba(120, 120, 120, 0.78)',
      noise: { opacity: theme === 'dark' ? 0.48 : 0.24, scale: 1 },
    }),
    [theme],
  );

  return (
    <div className="relative min-h-screen bg-[#e7e5df] text-gray-900 transition-colors duration-500 dark:bg-[#050505] dark:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <EtheralShadow
          className="h-full w-full"
          color={backgroundConfig.color}
          animation={{ scale: 56, speed: 62 }}
          noise={backgroundConfig.noise}
          sizing="fill"
          showTitle={false}
        />
        <div className="bg-ambient-layer bg-ambient-layer-a" />
        <div className="bg-ambient-layer bg-ambient-layer-b" />
        <div
          className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-[linear-gradient(180deg,rgba(0,0,0,0.46),rgba(0,0,0,0.84))]'
              : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(241,239,234,0.82))]'
          }`}
        />
      </div>
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Section content with AnimatePresence transitions */}
      <main className="relative z-10 min-h-screen pb-24 md:pb-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSection}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveComponent
              portfolioData={portfolioData}
              onNavigate={handleNavigate}
              onOpenProject={handleOpenProject}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {ProjectModalComponent && activeProject ? (
        <ProjectModalComponent project={activeProject} onClose={() => setActiveProject(null)} />
      ) : null}
    </div>
  );
}
