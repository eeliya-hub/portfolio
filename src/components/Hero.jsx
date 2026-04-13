import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const Hero = ({ onNavigate, portfolioData }) => {
  const { name, role, intro } = portfolioData.identity;
  const { displayed } = useTypewriter(name, 90, 500);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 sm:px-10 lg:px-16 overflow-hidden">
      {/* Decorative glass shapes */}
      <div className="absolute top-16 right-20 h-28 w-28 rounded-3xl rotate-12 glass-object opacity-30 dark:opacity-15 orb-1" />
      <div className="absolute bottom-24 left-14 h-20 w-20 rounded-full glass-object opacity-25 dark:opacity-12 orb-2" />
      <div className="absolute top-1/4 left-1/3 h-14 w-14 rounded-2xl rotate-45 glass-object opacity-20 dark:opacity-10 orb-3" />
      <div className="absolute bottom-1/3 right-1/4 h-10 w-32 rounded-full glass-object opacity-18 dark:opacity-10 float-gentle" />

      <div className="text-center max-w-2xl">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for new projects
          </span>
        </motion.div>

        {/* Name with typing effect */}
        <h1 className="mt-8 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1] tracking-tight bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          {displayed}
          <span className="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-indigo-500 dark:bg-indigo-400 animate-blink rounded-sm" />
        </h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg font-medium text-gray-900 dark:text-white"
        >
          {role}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 text-[1.05rem] leading-relaxed text-gray-500 dark:text-gray-400"
        >
          {intro}
        </motion.p>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.04] active:scale-[0.97]"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="glass-strong inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] dark:text-gray-300"
          >
            Get In Touch
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="glass inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-gray-500 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] dark:text-gray-400"
          >
            About Me
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
