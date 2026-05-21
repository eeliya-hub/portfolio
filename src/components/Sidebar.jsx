import { useEffect, useRef, useState } from 'react';
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
    timerRef.current = setTimeout(() => setExpanded(true), 260);
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    setExpanded(false);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <>
      <aside
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 overflow-hidden rounded-2xl py-3 px-2 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
          expanded ? 'w-40 glass-strong' : 'w-[3.75rem] glass'
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex h-11 items-center gap-3 whitespace-nowrap rounded-xl px-2.5 transition-colors duration-200 ${
                isActive
                  ? 'bg-black/[0.05] text-gray-900 dark:bg-white/[0.08] dark:text-white'
                  : 'text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span
                className={`overflow-hidden text-xs font-semibold transition-all duration-200 ${
                  expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </aside>

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
                  ? 'bg-black/[0.05] text-gray-900 dark:bg-white/[0.08] dark:text-white'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
