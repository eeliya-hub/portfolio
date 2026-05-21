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
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-white/60">
            {typedTitle}<span className={`inline-block w-[2px] h-[1em] bg-gray-800 dark:bg-white/80 ml-0.5 align-middle ${titleDone ? 'animate-blink' : ''}`} />
          </h2>
          <p className="mt-2 min-h-[3rem] md:min-h-[1.75rem] text-gray-500 dark:text-gray-400">
            {typedSub}
          </p>
        </motion.div>

        <div className="relative mt-10 space-y-0">
          {/* Vertical line — gradient */}
          <div className="absolute bottom-3 left-5 top-3 w-px bg-gradient-to-b from-black/18 via-black/8 to-transparent dark:from-white/18 dark:via-white/10" />

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
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass cursor-default transition-all duration-300 group-hover:shadow-lg group-hover:shadow-black/10 dark:group-hover:shadow-black/20"
                >
                  <Icon className="h-4 w-4 text-gray-700 dark:text-white/75" />
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="glass rounded-2xl p-4 flex-1 cursor-default transition-all duration-300"
                >
                  <span className="inline-block rounded-lg bg-black/5 px-2.5 py-1 text-[0.68rem] font-semibold text-gray-700 dark:bg-white/[0.08] dark:text-white/70">
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
                        className="glass-subtle rounded-lg px-2.5 py-1 text-[0.72rem] font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
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
