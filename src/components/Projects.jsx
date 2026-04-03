import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const Projects = ({ onOpenProject, portfolioData }) => {
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
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              {displayed}<span className={`inline-block w-[2px] h-[1em] bg-indigo-500 dark:bg-indigo-400 ml-0.5 align-middle ${done ? 'animate-blink' : ''}`} />
            </h2>
            <p className="mt-2 min-h-[3rem] md:min-h-[1.75rem] text-gray-500 dark:text-gray-400">
              {subDisplayed}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="glass-strong rounded-xl p-2 text-gray-500 transition-all hover:text-gray-900 hover:scale-110 active:scale-95 dark:text-gray-400 dark:hover:text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="glass-strong rounded-xl p-2 text-gray-500 transition-all hover:text-gray-900 hover:scale-110 active:scale-95 dark:text-gray-400 dark:hover:text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div ref={scrollRef} className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {portfolioData.projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onOpenProject(project)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass group relative flex w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100/50 dark:bg-white/[0.04]">
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
                <span className="mb-2 inline-block self-start rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-2.5 py-1 text-[0.68rem] font-semibold text-indigo-600 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-400">
                  {project.category}
                </span>
                <h3 className="text-[1rem] font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="glass-subtle rounded-md px-2 py-0.5 text-[0.7rem] font-medium text-gray-600 dark:text-gray-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-gray-200/40 dark:border-white/[0.04] text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  View project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
