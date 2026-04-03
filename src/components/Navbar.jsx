import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

const Navbar = ({ activeLabel, onToggleTheme, theme }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 flex items-center justify-between rounded-2xl border border-white/20 bg-white/60 px-6 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/60"
    >
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        Portfolio
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-gray-500 dark:text-gray-400 sm:inline">
          {activeLabel}
        </span>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
