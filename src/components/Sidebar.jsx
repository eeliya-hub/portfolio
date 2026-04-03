import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  FolderKanban,
  Home,
  Mail,
  Route,
  User,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Stack', icon: Cpu },
  { id: 'journey', label: 'Journey', icon: Route },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const Sidebar = ({ activeSection, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setExpanded(true), 1000);
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    setExpanded(false);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <>
      {/* Desktop sidebar — expands after 3s hover */}
      <motion.aside
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{ width: expanded ? 160 : 60 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col glass-strong rounded-2xl py-3 px-2 gap-1 overflow-hidden"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center gap-3 rounded-xl h-11 px-2.5 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="absolute inset-0 rounded-xl bg-indigo-50/80 dark:bg-indigo-500/[0.12] glass-subtle"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.12 }}
                />
              )}
              <item.icon className="relative h-[18px] w-[18px] shrink-0" />
              <motion.span
                animate={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}
                transition={{ duration: 0.2 }}
                className="relative text-xs font-semibold overflow-hidden"
              >
                {item.label}
              </motion.span>
            </button>
          );
        })}
      </motion.aside>

      {/* Mobile bottom bar — floating */}
      <nav className="fixed left-3 right-3 bottom-3 z-40 flex md:hidden items-center justify-around glass-strong rounded-2xl px-1 pb-[env(safe-area-inset-bottom)] pt-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[0.6rem] font-medium transition-colors ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-pill"
                  className="absolute inset-0 rounded-xl bg-indigo-50/60 dark:bg-indigo-500/[0.08]"
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                />
              )}
              <item.icon className="relative h-[18px] w-[18px]" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
