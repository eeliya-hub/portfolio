import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Braces,
  Brain,
  Clock3,
  Code2,
  Crown,
  Database,
  FolderGit2,
  GitBranch,
  Layers,
  Lightbulb,
  MessageSquare,
  MonitorCog,
  MonitorSmartphone,
  Palette,
  RefreshCw,
  Rocket,
  Send,
  Sparkles,
  Users,
  Waypoints,
  X,
  Zap,
  ClipboardList,
} from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const tabIcons = [Code2, Layers, MonitorCog, Braces, Users];

const skillBrandColors = {
  Python: '#3776ab',
  Java: '#f89820',
  JavaScript: '#f7df1e',
  Dart: '#0175c2',
  SQL: '#003b57',
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
  'VS Code': '#007acc',
  Git: '#f1502f',
  GitHub: '#111827',
  Figma: '#f24e1e',
  Postman: '#ff6c37',
  'Google Cloud': '#4285f4',
  Xcode: '#147efb',
  'Android Studio': '#3ddc84',
};

const base = import.meta.env.BASE_URL;

const skillAssetMap = {
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
  'VS Code': `${base}logos/vscode.png`,
  Git: `${base}logos/Git_icon.svg.png`,
  GitHub: `${base}logos/github.png`,
  Figma: `${base}logos/figma.png`,
  Postman: `${base}logos/postman.png`,
  'Google Cloud': `${base}logos/google-cloud.png`,
  Xcode: `${base}logos/Xcode_26_icon.png`,
  'Android Studio': `${base}logos/Android_Studio_Logo_(2023).svg.png`,
};

/* Lucide icons for skills without a logo file */
const skillLucideIcons = {
  'REST APIs': Send,
  Express: Zap,
  'Responsive Design': MonitorSmartphone,
  'API Design': Waypoints,
  'MVVM Architecture': Layers,
  'Database Modelling': Database,
  'Motion & Animation': Sparkles,
  'CI/CD Workflows': Rocket,
  'Version Control': GitBranch,
  'UI/UX Systems': Palette,
  Leadership: Crown,
  Communication: MessageSquare,
  'Problem Solving': Lightbulb,
  'Team Collaboration': Users,
  'Time Management': Clock3,
  Adaptability: RefreshCw,
  'Critical Thinking': Brain,
  'Project Management': ClipboardList,
};

const SkillBadge = ({ name, large = false }) => {
  const assetSrc = skillAssetMap[name];
  const LucideIcon = skillLucideIcons[name];

  if (assetSrc) {
    return (
      <img
        src={assetSrc}
        alt=""
        aria-hidden="true"
        className={`${large ? 'h-5 w-5' : 'h-4 w-4'} object-contain`}
      />
    );
  }

  if (LucideIcon) {
    return (
      <LucideIcon
        className={`${large ? 'h-5 w-5' : 'h-4 w-4'} text-indigo-600 dark:text-indigo-400`}
      />
    );
  }

  return (
    <span className={`${large ? 'text-sm' : 'text-[0.65rem]'} font-bold text-indigo-600 dark:text-indigo-400`}>
      {name.split(/[\s./&+-]+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()}
    </span>
  );
};

const Skills = ({ portfolioData }) => {
  const { groups } = portfolioData.skills;
  const { displayed: typedTitle, done: titleDone } = useTypewriter('Tech Stack', 80, 200);
  const { displayed: typedSub } = useTypewriter('Languages, frameworks, tools, and skills I bring to the table.', 20, 900);
  const [activeTab, setActiveTab] = useState(0);
  const [popupSkill, setPopupSkill] = useState(null); // { item, rect } or null

  const openPopup = (item, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupSkill({ item, rect });
  };

  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {typedTitle}<span className={`inline-block w-[2px] h-[1em] bg-indigo-500 dark:bg-indigo-400 ml-0.5 align-middle ${titleDone ? 'animate-blink' : ''}`} />
          </h2>
          <p className="mt-2 min-h-[3rem] md:min-h-[1.75rem] text-gray-600 dark:text-gray-400">
            {typedSub}
          </p>
        </motion.div>

        {/* Category toggle tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-8 glass rounded-2xl p-1.5 inline-flex gap-1 flex-wrap"
        >
          {groups.map((group, i) => {
            const Icon = tabIcons[i];
            const isActive = activeTab === i;
            return (
              <button
                key={group.title}
                onClick={() => { setActiveTab(i); setPopupSkill(null); }}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.8rem] font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="skills-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20"
                    transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                  />
                )}
                {Icon && <Icon className="relative h-4 w-4" />}
                <span className="relative hidden sm:inline">{group.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active group — clickable items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {groups[activeTab].title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                {groups[activeTab].description}
              </p>

              <div className="flex flex-wrap gap-3">
                {groups[activeTab].items.map((item, idx) => (
                  <motion.button
                    key={item.name}
                    type="button"
                    onClick={(e) => openPopup(item, e)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="glass-subtle group flex items-center gap-2.5 rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-indigo-300/70 dark:hover:border-indigo-300/35"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${skillBrandColors[item.name] || '#4f46e5'}20, ${skillBrandColors[item.name] || '#7c3aed'}30)`,
                      }}
                    >
                      <SkillBadge name={item.name} />
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Popup overlay ─── */}
      <AnimatePresence>
        {popupSkill && (
          <motion.div
            key="skill-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setPopupSkill(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-strong rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setPopupSkill(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${skillBrandColors[popupSkill.item.name] || '#4f46e5'}20, ${skillBrandColors[popupSkill.item.name] || '#7c3aed'}30)`,
                  }}
                >
                  <SkillBadge name={popupSkill.item.name} large />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {popupSkill.item.name}
                </h4>
              </div>

              {popupSkill.item.desc && (
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {popupSkill.item.desc}
                </p>
              )}

              {popupSkill.item.used && (
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Used in:</span>{' '}
                  {popupSkill.item.used}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
