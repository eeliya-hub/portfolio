import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Heart,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const base = import.meta.env.BASE_URL;
const westminsterLogo = `${base}logos/westminster.jpg`;

const orbitTileOffsets = [-66.666, -33.333, 0, 33.333, 66.666];
const orbitShift = 33.333;
const orbitLabelSpan = 115;

function orbitLabel(title) {
  return title.toUpperCase();
}

const About = ({ portfolioData }) => {
  const { identity, about } = portfolioData;
  const { education, highlights = [] } = about;
  const { displayed, done } = useTypewriter('About Me', 80, 200);
  const [activeDetail, setActiveDetail] = useState(null);
  const [animatedCardId, setAnimatedCardId] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const focusPills = (identity.focus ?? []).slice(0, 4);

  const detailCards = [
    {
      id: 'background',
      eyebrow: 'Profile',
      title: 'Personal Background',
      hoverTitle: 'My Background',
      teaser: 'Who I am',
      icon: UserRound,
      summary:
        'I come from a mix of Persian and British influence, which probably explains why I care about communication, presentation, and how work is perceived as much as the implementation itself.',
      points: [
        'Retail and student life made me adaptable, socially aware, and comfortable across different environments.',
        'I naturally over-iterate on details because I want the end result to feel credible, polished, and taken seriously.',
        'Long term, I want to build software that feels bigger than coursework and closer to real products people would choose.',
      ],
      mode: 'list',
    },
    {
      id: 'interests',
      eyebrow: 'Interests',
      title: 'Passions & Interests',
      hoverTitle: 'What I Enjoy',
      teaser: 'What I enjoy building',
      icon: Heart,
      summary:
        'A lot of my interests revolve around movement, systems, and culture, so travel, aviation, football, geopolitics, internet culture, and design all end up feeding the way I think.',
      points: ['Travel & aviation', 'Football & predictions', 'Geopolitics', 'AI & design'],
      mode: 'chips',
    },
    {
      id: 'skills',
      eyebrow: 'Strengths',
      title: 'Skills & Attributes',
      hoverTitle: 'How I Build',
      teaser: 'What comes through in my work',
      icon: Code2,
      summary:
        'My edge is usually a mix of product instinct, aesthetic sensitivity, and technical adaptability. I care about architecture and scalability, but I also care a lot about whether the result feels premium.',
      points: ['Product instinct', 'UI polish', 'Adaptability', 'System thinking'],
      note: highlights.map((item) => item.value).slice(0, 2),
      mode: 'chips',
    },
  ];

  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="bg-gradient-to-r from-amber-700 via-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-amber-200 dark:via-yellow-100 dark:to-orange-200">
            {displayed}
            <span className={`ml-0.5 inline-block h-[1em] w-[2px] align-middle ${done ? 'animate-blink' : ''} bg-amber-500 dark:bg-amber-300`} />
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-400">
            The perspective behind the work, what I study, and how I like to build.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[1.7fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="project-card grid h-full grid-rows-[auto_1fr_auto] gap-6 rounded-[2rem] p-7"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[1.04rem] font-semibold uppercase tracking-[0.19em] text-amber-700 dark:text-amber-300 sm:text-[1.12rem]">
                  {identity.role}
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-[1rem] leading-relaxed text-gray-700 dark:text-gray-300">
              {identity.intro}
            </p>

            {focusPills.length > 0 && (
              <div className="flex flex-wrap gap-2.5 lg:flex-nowrap">
                {focusPills.map((item) => (
                  <div
                    key={item}
                    className="project-chip rounded-full px-3 py-1.5 text-[0.78rem] font-medium whitespace-nowrap text-stone-700 dark:text-stone-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="project-card grid h-full grid-rows-[auto_1fr_auto] gap-6 rounded-[2rem] p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                <GraduationCap className="h-6 w-6" />
              </div>
              <img
                src={westminsterLogo}
                alt="University of Westminster"
                className="h-12 w-12 rounded-2xl object-cover"
              />
            </div>

            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
                Education
              </p>
              <p className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
                {education.institution}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {education.degree} (Honours)
              </p>
            </div>

            <div className="project-chip inline-flex w-fit items-center self-start rounded-full px-3.5 py-1.5">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {education.result}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {detailCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.button
                  key={card.id}
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={card.title}
                  onClick={() => setActiveDetail(card)}
                  onHoverStart={() => setAnimatedCardId(card.id)}
                  onHoverEnd={() => setAnimatedCardId((current) => (current === card.id ? null : current))}
                  onFocus={() => setAnimatedCardId(card.id)}
                  onBlur={() => setAnimatedCardId((current) => (current === card.id ? null : current))}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group project-card relative flex min-h-[11.5rem] h-full items-end overflow-hidden rounded-[1.8rem] p-5 text-left transition-all duration-300 hover:border-amber-300/35"
                >
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-[0.45rem] z-[1] h-[calc(100%-0.9rem)] w-[calc(100%-0.9rem)] overflow-visible text-amber-700/40 transition-opacity duration-200 dark:text-amber-300/32 ${
                      animatedCardId === card.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <path
                      id={`about-orbit-${card.id}`}
                      d="M13,3 H87 A10,10 0 0 1 97,13 V87 A10,10 0 0 1 87,97 H13 A10,10 0 0 1 3,87 V13 A10,10 0 0 1 13,3 Z"
                      fill="none"
                      pathLength="100"
                    />
                    <text
                      fill="currentColor"
                      fontSize="6.1"
                      fontWeight="700"
                      letterSpacing="0.18"
                      textRendering="geometricPrecision"
                    >
                      {orbitTileOffsets.map((offset) => (
                        <textPath
                          key={`${card.id}-${offset}`}
                          href={`#about-orbit-${card.id}`}
                          startOffset={`${offset}%`}
                          textLength={orbitLabelSpan}
                          lengthAdjust="spacingAndGlyphs"
                        >
                          {orbitLabel(card.title)}
                          {!prefersReducedMotion && animatedCardId === card.id && (
                            <animate
                              attributeName="startOffset"
                              from={`${offset}%`}
                              to={`${offset + orbitShift}%`}
                              dur={`${18 + index * 1.25}s`}
                              repeatCount="indefinite"
                              calcMode="linear"
                            />
                          )}
                        </textPath>
                      ))}
                    </text>
                  </svg>
                  <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-5 text-center">
                    <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-amber-700 transition-all duration-300 dark:text-amber-300 md:-translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      {card.eyebrow}
                    </p>
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-3 text-[1.05rem] font-semibold tracking-tight text-stone-900 transition-all duration-300 dark:text-white md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      {card.hoverTitle}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="project-card grid min-h-[11.5rem] self-start rounded-[1.8rem] p-7"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <p className="text-[clamp(0.74rem,0.92vw,0.9rem)] font-semibold uppercase tracking-[0.15em] text-amber-700 dark:text-amber-300 whitespace-nowrap">
                Happy To Collaborate
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                Open to internships, grad schemes, junior roles, freelance builds, and collaborative projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeDetail && (
          <motion.div
            key={activeDetail.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveDetail(null)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm dark:bg-black/50" />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ type: 'spring', duration: 0.38, bounce: 0.16 }}
              onClick={(event) => event.stopPropagation()}
              className="relative glass-strong w-full max-w-xl rounded-[2rem] border border-amber-300/60 p-6 shadow-2xl dark:border-amber-300/20"
            >
              <button
                type="button"
                onClick={() => setActiveDetail(null)}
                className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-300/20 text-amber-700 dark:from-amber-400/18 dark:to-yellow-200/18 dark:text-amber-300">
                  <activeDetail.icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
                    {activeDetail.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white">
                    {activeDetail.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {activeDetail.summary}
              </p>

              {activeDetail.mode === 'chips' ? (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {activeDetail.points.map((point) => (
                    <div
                      key={point}
                      className="project-chip rounded-full px-3.5 py-2 text-sm font-medium text-stone-700 dark:text-stone-200"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 grid gap-3">
                  {activeDetail.points.map((point) => (
                    <div
                      key={point}
                      className="project-chip flex items-start gap-3 rounded-2xl p-4"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500 dark:bg-amber-300" />
                      <span className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeDetail.note?.length ? (
                <div className="mt-6 grid gap-3">
                  {activeDetail.note.map((item) => (
                    <div
                      key={item}
                      className="project-chip rounded-2xl p-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
