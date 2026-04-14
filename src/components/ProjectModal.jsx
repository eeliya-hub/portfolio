import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, ExternalLink, FileText, FolderGit2, Play, X } from 'lucide-react';
import ProjectCarousel from './ProjectCarousel';

const base = import.meta.env.BASE_URL;

const techAssetMap = {
  Python: `${base}logos/python.png`,
  Java: `${base}logos/java.png`,
  JavaScript: `${base}logos/js.png`,
  Dart: `${base}logos/dart.png`,
  SQL: `${base}logos/sql.png`,
  Swift: `${base}logos/swift.png`,
  PHP: `${base}logos/PHP-logo.svg.png`,
  HTML: `${base}logos/HTML5_logo_and_wordmark.svg.png`,
  CSS: `${base}logos/CSS3_logo_and_wordmark.svg.png`,
  React: `${base}logos/React-icon.svg.png`,
  'Node.js': `${base}logos/nodejs.png`,
  Django: `${base}logos/Django-Logo.png`,
  Flutter: `${base}logos/flutter.png`,
  SwiftUI: `${base}logos/swiftui-256x256_2x.png`,
  'Tailwind CSS': `${base}logos/Tailwind_CSS_Logo.svg.png`,
  Vite: `${base}logos/Vitejs-logo.svg.png`,
  Firebase: `${base}logos/firebase-icon-logo-png_seeklogo-615938.png`,
  Git: `${base}logos/Git_icon.svg.png`,
  GitHub: `${base}logos/github.png`,
  Figma: `${base}logos/figma.png`,
  Postman: `${base}logos/postman.png`,
  'Google Cloud': `${base}logos/google-cloud.png`,
  Xcode: `${base}logos/Xcode_26_icon.png`,
  'Android Studio': `${base}logos/Android_Studio_Logo_(2023).svg.png`,
};

const techBrandColors = {
  Python: '#3776ab',
  Java: '#f89820',
  JavaScript: '#f7df1e',
  Dart: '#0175c2',
  SQL: '#003b57',
  SQLite: '#003b57',
  Swift: '#fa7343',
  PHP: '#777bb4',
  HTML: '#e34c26',
  CSS: '#1572b6',
  React: '#61dafb',
  'Node.js': '#68a063',
  Express: '#111827',
  Django: '#092e20',
  Flutter: '#54c5f8',
  SwiftUI: '#0f172a',
  'Tailwind CSS': '#06b6d4',
  Vite: '#646cff',
  Firebase: '#ff9100',
  'REST APIs': '#4f46e5',
  Git: '#f1502f',
  GitHub: '#111827',
  Figma: '#f24e1e',
  Postman: '#ff6c37',
  'Google Cloud': '#4285f4',
  Xcode: '#147efb',
  'Android Studio': '#3ddc84',
};

const getActionIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('github')) return FolderGit2;
  if (l.includes('demo') || l.includes('preview') || l.includes('prototype') || l.includes('dashboard')) return Play;
  if (l.includes('study') || l.includes('doc') || l.includes('walkthrough') || l.includes('breakdown')) return FileText;
  return ExternalLink;
};

const ProjectModal = ({ onClose, project }) => {
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showTravelDataWarning, setShowTravelDataWarning] = useState(false);

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, project]);

  useEffect(() => {
    setShowTravelDataWarning(false);
  }, [project?.id]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xl dark:bg-black/60"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-visible shadow-2xl"
          >
            {/* Header — title left, action icons center, close right */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-t-3xl glass-strong border-b border-white/20 dark:border-white/[0.06] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-indigo-500/70 dark:text-indigo-400/60">
                  Project
                </p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
              </div>

              {/* Action icon buttons */}
              <div className="flex items-center gap-2">
                {project.id === 'traverse' && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowTravelDataWarning((prev) => !prev)}
                      onMouseEnter={() => setHoveredAction('Travel Data Warning')}
                      onMouseLeave={() => setHoveredAction(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/80 bg-amber-100/90 text-amber-700 shadow-[0_0_0_1px_rgba(251,191,36,0.35),0_0_18px_rgba(245,158,11,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:bg-amber-200/90 dark:border-amber-300/70 dark:bg-amber-500/25 dark:text-amber-300 [animation:pulse_4s_ease-in-out_infinite]"
                      aria-label="Travel data warning"
                      aria-expanded={showTravelDataWarning}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {hoveredAction === 'Travel Data Warning' && !showTravelDataWarning && (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg glass-strong px-2.5 py-1 text-[0.65rem] font-medium text-gray-700 dark:text-gray-300 shadow-lg z-50"
                        >
                          Travel Data Warning
                        </motion.span>
                      )}
                    </AnimatePresence>

                  </div>
                )}

                {project.actions.map((action) => {
                  const Icon = getActionIcon(action.label);
                  const Tag = action.href ? 'a' : 'button';
                  const linkProps = action.href
                    ? {
                        href: action.href,
                        ...(action.download
                          ? { download: '' }
                          : { target: '_blank', rel: 'noopener noreferrer' }),
                      }
                    : { type: 'button' };
                  return (
                    <div key={action.label} className="relative">
                      <Tag
                        {...linkProps}
                        onMouseEnter={() => setHoveredAction(action.label)}
                        onMouseLeave={() => setHoveredAction(null)}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl glass text-gray-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 ${!action.href ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <Icon className="h-4 w-4" />
                      </Tag>
                      <AnimatePresence>
                        {hoveredAction === action.label && (
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg glass-strong px-2.5 py-1 text-[0.65rem] font-medium text-gray-700 dark:text-gray-300 shadow-lg z-50"
                          >
                            {action.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-xl glass text-gray-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="grid flex-1 gap-6 overflow-hidden rounded-b-3xl glass-strong overflow-y-auto p-5 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Left column — carousel + tech stack */}
              <div className="space-y-5">
                <ProjectCarousel key={project.id} images={project.gallery} title={project.title} />

                {/* Tech — big tags with icons */}
                <div>
                  <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-widest text-indigo-500/70 dark:text-indigo-400/60">
                    Tech stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => {
                      const assetSrc = techAssetMap[t];
                      const color = techBrandColors[t] || '#4f46e5';
                      const isDark = ['#111827', '#0f172a', '#003b57', '#092e20'].includes(color);
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.45),0_8px_24px_rgba(79,70,229,0.12)] dark:text-gray-200 dark:hover:shadow-[0_0_0_1px_rgba(129,140,248,0.4),0_8px_24px_rgba(129,140,248,0.14)]"
                          style={{
                            background: `linear-gradient(to bottom right, ${color}${isDark ? '18' : '12'}, ${color}${isDark ? '28' : '20'})`,
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : `${color}25`}`,
                          }}
                        >
                          {assetSrc ? (
                            <img src={assetSrc} alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
                          ) : (
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          )}
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right column — description + highlights */}
              <div className="flex flex-col">
                {/* Category + Overview */}
                <div>
                  <span className="inline-block rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-indigo-600 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-400">
                    {project.category}
                  </span>
                  <h4 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Overview
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mt-auto pt-5">
                  <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-widest text-indigo-500/70 dark:text-indigo-400/60">
                    Highlights
                  </p>
                  <div className="space-y-2">
                    {project.features.map((f) => (
                      <div
                        key={f}
                        className="glass-subtle rounded-xl px-4 py-3 text-sm leading-relaxed text-gray-600 transition-all duration-200 hover:scale-[1.01] dark:text-gray-300"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {project.id === 'traverse' && showTravelDataWarning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[80]"
                >
                  <button
                    type="button"
                    aria-label="Close travel data warning"
                    onClick={() => setShowTravelDataWarning(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                  />

                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.22 }}
                      className="relative z-[81] w-[min(92vw,36rem)] rounded-2xl glass-strong border border-amber-300/70 bg-gradient-to-br from-amber-50/95 via-yellow-50/95 to-orange-50/95 p-5 pr-12 shadow-2xl dark:border-amber-300/35 dark:from-amber-950/88 dark:via-amber-900/82 dark:to-orange-950/82"
                    >
                      <button
                        type="button"
                        onClick={() => setShowTravelDataWarning(false)}
                        aria-label="Close alert"
                        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-amber-300/70 bg-amber-100/80 text-amber-800 transition-all duration-200 hover:scale-105 hover:bg-amber-200/90 dark:border-amber-300/40 dark:bg-amber-500/20 dark:text-amber-200"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>

                      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
                        Service Alert
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-snug text-amber-900 dark:text-amber-100">
                        Live travel search is currently unstable and will be permanently discontinued.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-amber-900/90 dark:text-amber-100/90">
                        Traverse originally used the Amadeus Self-Service APIs for flight and hotel search. Amadeus has announced a full shutdown of this developer portal on <span className="font-bold">17 July 2026</span>, after which all keys will be revoked and API access will be disabled.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-amber-900/90 dark:text-amber-100/90">
                        Intermittent outages and response failures are already occurring, so live requests may fail at any time.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed font-medium text-amber-950 dark:text-amber-50">
                        To keep the product fully demonstrable, searches now automatically fall back to sample/demo data. You can still enter example locations and explore end-to-end flight and hotel results, trip planning integration, and booking flow behavior.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
