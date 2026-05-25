import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const Projects = ({ onOpenProject, portfolioData, actionText, onAction }) => {
  const scrollRef = useRef(null);
  const { displayed, done } = useTypewriter('Projects', 80, 200);
  const { displayed: subDisplayed } = useTypewriter('A selection of things I\'ve built and explored.', 20, 900);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="bg-gradient-to-r from-amber-700 via-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-amber-200 dark:via-yellow-100 dark:to-orange-200">
              {displayed}<span className={`ml-0.5 inline-block h-[1em] w-[2px] align-middle ${done ? 'animate-blink' : ''} bg-amber-500 dark:bg-amber-300`} />
            </h2>
            <p className="mt-2 min-h-[3rem] md:min-h-[1.75rem] text-gray-500 dark:text-gray-400">
              {subDisplayed}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              className="glass-strong rounded-xl p-2 text-gray-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-gray-900 hover:scale-105 active:scale-95 dark:text-gray-400 dark:hover:text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="glass-strong rounded-xl p-2 text-gray-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-gray-900 hover:scale-105 active:scale-95 dark:text-gray-400 dark:hover:text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div ref={scrollRef} className="mt-10 -mx-1 flex gap-5 overflow-x-auto overflow-y-visible px-1 pt-3 pb-4 snap-x snap-mandatory scrollbar-hide">
          {portfolioData.projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onOpenProject(project)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass group relative flex w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ boxShadow: 'none' }}
            >
              {/* Thumbnail */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100/70 dark:bg-white/[0.04]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                {/* Overlay shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-block self-start rounded-lg bg-gradient-to-r from-amber-400/20 to-yellow-300/20 px-2.5 py-1 text-[0.68rem] font-semibold text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                  {project.category}
                </span>
                <h3 className="text-[1rem] font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-stone-700 dark:text-gray-400">
                  {project.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="glass-subtle rounded-md border border-transparent px-2 py-0.5 text-[0.7rem] font-medium text-stone-600 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-amber-300/75 group-hover:bg-white/65 group-hover:text-stone-800 dark:text-stone-400 dark:group-hover:border-amber-300/40 dark:group-hover:bg-white/10 dark:group-hover:text-amber-50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t border-amber-950/10 pt-3 text-sm font-medium text-amber-700 dark:border-amber-100/8 dark:text-amber-300">
                  View project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {actionText && onAction ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onAction}
              className="text-sm font-medium text-amber-700 transition-colors duration-200 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
            >
              {actionText}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Projects;
