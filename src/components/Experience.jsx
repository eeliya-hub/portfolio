import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Lightbulb, Rocket, School } from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const icons = [School, Briefcase, Lightbulb, GraduationCap, Rocket];

const Experience = ({ portfolioData }) => {
  const { displayed: typedTitle, done: titleDone } = useTypewriter('Journey', 80, 200);
  const { displayed: typedSub } = useTypewriter('How I got here and where I\'m heading.', 20, 900);
  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {typedTitle}<span className={`inline-block w-[2px] h-[1em] bg-indigo-500 dark:bg-indigo-400 ml-0.5 align-middle ${titleDone ? 'animate-blink' : ''}`} />
          </h2>
          <p className="mt-2 min-h-[3rem] md:min-h-[1.75rem] text-gray-500 dark:text-gray-400">
            {typedSub}
          </p>
        </motion.div>

        <div className="relative mt-10 space-y-0">
          {/* Vertical line — gradient */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-indigo-400/40 via-purple-400/30 to-transparent dark:from-indigo-500/20 dark:via-purple-500/15" />

          {portfolioData.journey.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative flex gap-5 pb-8 group"
              >
                {/* Dot — glass circle */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass cursor-default transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                >
                  <Icon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="glass rounded-2xl p-4 flex-1 cursor-default transition-all duration-300"
                >
                  <span className="inline-block rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-2.5 py-1 text-[0.68rem] font-semibold text-indigo-600 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-400">
                    {item.phase}
                  </span>
                  <h3 className="mt-2 text-[1rem] font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.bullets.map((bullet) => (
                      <span
                        key={bullet}
                        className="glass-subtle rounded-lg px-2.5 py-1 text-[0.72rem] font-medium text-gray-500 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400"
                      >
                        {bullet}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
