import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  GraduationCap,
  Layers3,
  MonitorSmartphone,
  Rocket,
  ServerCog,
  Sparkles,
} from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const focusIcons = {
  'Frontend Systems': MonitorSmartphone,
  'Backend Services': ServerCog,
  'Mobile Interfaces': Sparkles,
  'Product Thinking': Layers3,
};

const About = ({ portfolioData }) => {
  const { education, focusAreas = [], highlights, summary } = portfolioData.about;
  const { displayed, done } = useTypewriter('About Me', 80, 200);
  const [activeFocus, setActiveFocus] = useState(0);

  const selectedFocus = focusAreas[activeFocus] ?? null;

  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="grid gap-5 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="project-card rounded-[2rem] p-7 lg:col-span-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="mb-3 bg-gradient-to-r from-amber-700 via-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-amber-200 dark:via-yellow-100 dark:to-orange-200">
                  {displayed}
                  <span className={`ml-0.5 inline-block h-[1em] w-[2px] align-middle ${done ? 'animate-blink' : ''} bg-amber-500 dark:bg-amber-300`} />
                </h2>
                <p className="max-w-2xl text-[1.02rem] leading-relaxed text-gray-700 dark:text-gray-300">
                  {summary}
                </p>
              </div>

              <div className="project-chip rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
                Tap To Explore
              </div>
            </div>

            {focusAreas.length ? (
              <div className="mt-8 space-y-5">
                <div className="flex flex-wrap gap-3">
                  {focusAreas.map((area, index) => {
                    const Icon = focusIcons[area.title] ?? Sparkles;
                    const isActive = index === activeFocus;

                    return (
                      <button
                        key={area.title}
                        type="button"
                        onClick={() => setActiveFocus(index)}
                        className={`project-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-left text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'border-amber-300/50 bg-amber-100/55 text-amber-800 dark:border-amber-300/25 dark:bg-amber-400/[0.08] dark:text-amber-200'
                            : 'text-stone-600 hover:-translate-y-0.5 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {area.title}
                      </button>
                    );
                  })}
                </div>

                <div className="project-chip min-h-[10.5rem] rounded-[1.6rem] p-5">
                  <AnimatePresence mode="wait">
                    {selectedFocus ? (
                      <motion.div
                        key={selectedFocus.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                            {(() => {
                              const Icon = focusIcons[selectedFocus.title] ?? Sparkles;
                              return <Icon className="h-5 w-5" />;
                            })()}
                          </div>
                          <div>
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
                              Current Thread
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {selectedFocus.title}
                            </p>
                          </div>
                        </div>

                        <p className="max-w-xl text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                          {selectedFocus.description}
                        </p>

                        <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                          <span>Profile focus</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            ) : null}
          </motion.div>

          <div className="grid gap-5 lg:col-span-2">
            {education && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="project-card rounded-[1.8rem] p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="project-chip rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
                    Education
                  </div>
                </div>

                <p className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
                  {education.institution}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {education.degree}
                </p>

                <div className="mt-5 project-chip inline-flex items-center gap-2 rounded-xl px-3 py-2">
                  <Rocket className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {education.result}
                  </span>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="project-card rounded-[1.8rem] p-6"
            >
              <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
                Snapshot
              </p>

              <div className="space-y-3">
                {highlights.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="project-chip flex w-full items-start justify-between gap-4 rounded-2xl p-4 text-left"
                    onClick={() => {
                      if (focusAreas[index]) setActiveFocus(index);
                    }}
                  >
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
