import { motion } from 'motion/react';
import { Cpu, FolderKanban, Home, Mail, Route, User } from 'lucide-react';

const iconMap = {
  home: Home,
  about: User,
  projects: FolderKanban,
  skills: Cpu,
  journey: Route,
  contact: Mail,
};

const Footer = ({ activeSection, items, onNavigate }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45 }}
      className="pointer-events-auto fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(92vw,760px)] justify-center"
      aria-label="Primary navigation"
    >
      <div className="dock-shell">
        {items.map((item) => {
          const Icon = iconMap[item.id];
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`dock-item ${isActive ? 'dock-item-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`dock-icon ${isActive ? 'dock-icon-active' : ''}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="dock-copy">
                <span className="dock-label">{item.label}</span>
                <span className="dock-hint">{item.hint}</span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Footer;
