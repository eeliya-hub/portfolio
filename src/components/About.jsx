import { motion } from 'motion/react';
import { GraduationCap, Rocket } from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const About = ({ portfolioData }) => {
  const { education, highlights, summary } = portfolioData.about;
  const { displayed, done } = useTypewriter('About Me', 80, 200);

  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* ─── Bio + Education row ─── */}
        <div className="grid gap-5 lg:grid-cols-5">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-7 lg:col-span-3"
          >
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              {displayed}<span className={`inline-block w-[2px] h-[1em] bg-indigo-500 dark:bg-indigo-400 ml-0.5 align-middle ${done ? 'animate-blink' : ''}`} />
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-gray-700 dark:text-gray-300">
              {summary}
            </p>
          </motion.div>

          {/* Education */}
          {education && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-2xl p-6 lg:col-span-2 flex flex-col justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-400 mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="text-[0.68rem] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                Education
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                {education.institution}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {education.degree}
              </p>
              <div className="mt-3 inline-flex self-start items-center gap-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1.5">
                <Rocket className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {education.result}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* ─── 3 Panels ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="glass rounded-2xl p-5 cursor-default"
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {item.label}
              </p>
              <p className="mt-2 text-[0.95rem] font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
