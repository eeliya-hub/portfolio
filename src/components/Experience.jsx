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
          <h2 className="bg-gradient-to-r from-amber-700 via-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-amber-200 dark:via-yellow-100 dark:to-orange-200">
            {typedTitle}<span className={`ml-0.5 inline-block h-[1em] w-[2px] align-middle ${titleDone ? 'animate-blink' : ''} bg-amber-500 dark:bg-amber-300`} />
          </h2>
          <p className="mt-2 min-h-[3rem] md:min-h-[1.75rem] text-gray-500 dark:text-gray-400">
            {typedSub}
          </p>
        </motion.div>

        <div className="relative mt-10 space-y-0">
          {/* Vertical line — gradient */}
          <div className="absolute bottom-3 left-5 top-3 w-px bg-gradient-to-b from-amber-400/50 via-yellow-400/35 to-transparent dark:from-amber-300/25 dark:via-yellow-200/15" />

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
                  className="project-chip relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full cursor-default transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/10"
                >
                  <Icon className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="project-card flex-1 rounded-2xl p-4 cursor-default transition-all duration-300"
                >
                  <span className="inline-block rounded-lg bg-gradient-to-r from-amber-400/20 to-yellow-300/20 px-2.5 py-1 text-[0.68rem] font-semibold text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
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
                        className="project-chip rounded-lg px-2.5 py-1 text-[0.72rem] font-medium text-stone-500 transition-colors duration-200 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-300"
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
