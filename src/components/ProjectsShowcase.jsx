import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { ArrowLeft, ArrowRight, Monitor, Smartphone } from 'lucide-react';

import IPhone3DMockup from './IPhone3DMockup';
import MacBook3DMockup from './MacBook3DMockup';
import Projects from './Projects';
import { useTypewriter } from '../utils/useTypewriter';
import './projectsShowcase.css';

const base = import.meta.env.BASE_URL;

const screenshotByProject = {
  traverse: `${base}screenshots/traverse.png`,
  'weather-app': `${base}screenshots/weather.png`,
  'alumni-api': `${base}screenshots/alumni-api.png`,
  'sky-health': `${base}screenshots/sky.png`,
  'prem-predictor': `${base}screenshots/PremPred1.png`,
};

const shortDescriptionByProject = {
  traverse: 'A cross-platform travel planner with search, itinerary, budget, and AI support.',
  'weather-app': 'A SwiftUI weather app with forecasts, maps, saved places, and local persistence.',
  'alumni-api': 'A two-service alumni backend with auth, profiles, bidding, and REST endpoints.',
  'sky-health': 'A Django health check platform with guided surveys, tracking, and trend views.',
  'prem-predictor': 'A browser-based Premier League predictor with leagues, scoring, and PDF reports.',
};

function projectSubset(portfolioProjects = []) {
  const ids = ['traverse', 'weather-app', 'alumni-api', 'sky-health', 'prem-predictor'];

  return portfolioProjects
    .filter((project) => ids.includes(project.id))
    .map((project) => ({
      id: project.id,
      title: project.title,
      description: shortDescriptionByProject[project.id] ?? project.summary,
      screenshot: screenshotByProject[project.id],
      platform: ['traverse', 'weather-app'].includes(project.id) ? 'mobile' : 'desktop',
      source: project,
    }));
}

export default function ProjectsShowcase({ portfolioData, onOpenProject }) {
  const sectionRef = useRef(null);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const projects = useMemo(() => projectSubset(portfolioData?.projects ?? []), [portfolioData]);
  const mobileProjects = useMemo(() => projects.filter((project) => project.platform === 'mobile'), [projects]);
  const desktopProjects = useMemo(() => projects.filter((project) => project.platform === 'desktop'), [projects]);
  const { displayed, done } = useTypewriter('Projects', 80, 200);
  const { displayed: subDisplayed } = useTypewriter('A selection of things I\'ve built and explored.', 20, 900);

  const [activePlatform, setActivePlatform] = useState('mobile');
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [platformDirection, setPlatformDirection] = useState(1);
  const [projectDirection, setProjectDirection] = useState(1);
  const [viewMode, setViewMode] = useState('focused');

  const activeProjects = activePlatform === 'mobile' ? mobileProjects : desktopProjects;
  const activeIndex = activePlatform === 'mobile' ? activeMobileIndex : activeDesktopIndex;
  const activeProject = activeProjects[activeIndex];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  if (!projects.length) return null;

  if (viewMode === 'all') {
    return (
      <Projects
        onOpenProject={onOpenProject}
        portfolioData={portfolioData}
        actionText="Back to focused view"
        onAction={() => setViewMode('focused')}
      />
    );
  }

  if (!activeProject) return null;

  const setNextProject = (direction) => {
    setProjectDirection(direction);
    if (activePlatform === 'mobile') {
      setActiveMobileIndex((current) => (current + direction + mobileProjects.length) % mobileProjects.length);
      return;
    }
    setActiveDesktopIndex((current) => (current + direction + desktopProjects.length) % desktopProjects.length);
  };

  const handlePlatformChange = (nextPlatform) => {
    if (nextPlatform === activePlatform) return;
    setPlatformDirection(nextPlatform === 'desktop' ? 1 : -1);
    setActivePlatform(nextPlatform);
  };

  const handleDirectionalStep = (direction) => {
    setNextProject(direction);
  };

  const handleWheelStep = (event) => {
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(dominantDelta) < 32 || wheelLockRef.current) return;
    event.preventDefault();
    wheelLockRef.current = true;
    handleDirectionalStep(dominantDelta > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 520);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    handleDirectionalStep(deltaX < 0 ? 1 : -1);
  };

  return (
    <section className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <div
          ref={sectionRef}
          className="projects-showcase"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="projects-showcase__single"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="projects-showcase__single-frame"
            >
              <div className="projects-showcase__intro-row">
                <div className="projects-showcase__intro">
                  <h2 className="projects-showcase__title projects-showcase__title--typed">
                    {displayed}
                    <span className={`ml-0.5 inline-block h-[1em] w-[2px] align-middle ${done ? 'animate-blink' : ''} bg-amber-500 dark:bg-amber-300`} />
                  </h2>
                  <p className="projects-showcase__description">{subDisplayed}</p>
                </div>

                <div className="projects-showcase__platform-toggle">
                  <button
                    type="button"
                    onClick={() => handlePlatformChange('mobile')}
                    className={`projects-showcase__platform-button ${activePlatform === 'mobile' ? 'projects-showcase__platform-button--active' : ''}`}
                  >
                    <Smartphone className="h-3 w-3" />
                    Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlatformChange('desktop')}
                    className={`projects-showcase__platform-button ${activePlatform === 'desktop' ? 'projects-showcase__platform-button--active' : ''}`}
                  >
                    <Monitor className="h-3 w-3" />
                    Desktop
                  </button>
                </div>
              </div>

              <div className="projects-showcase__card-stage">
                <button
                  type="button"
                  className="projects-showcase__control projects-showcase__control--side"
                  onClick={() => handleDirectionalStep(-1)}
                  aria-label="Previous project"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div
                  className="projects-showcase__single-layout"
                  onWheel={handleWheelStep}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="projects-showcase__single-copy">
                    <AnimatePresence
                      mode="wait"
                      custom={projectDirection}
                    >
                      <motion.div
                        key={activeProject.id}
                        className="projects-showcase__copy-motion"
                        custom={projectDirection}
                        initial={(direction) => ({
                          x: direction > 0 ? 28 : -28,
                          opacity: 0,
                        })}
                        animate={{ x: 0, opacity: 1 }}
                        exit={(direction) => ({
                          x: direction > 0 ? -28 : 28,
                          opacity: 0,
                        })}
                        transition={{
                          duration: 0.42,
                          ease: 'easeOut',
                        }}
                      >
                        <div className="projects-showcase__single-header">
                          <h3 className="projects-showcase__single-title">{activeProject.title}</h3>
                        </div>

                        <p className="projects-showcase__single-description">{activeProject.description}</p>
                        <button
                          type="button"
                          onClick={() => onOpenProject?.(activeProject.source)}
                          className="projects-showcase__open"
                        >
                          View Project
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="projects-showcase__device-shell">
                    <AnimatePresence
                      mode="wait"
                      custom={platformDirection}
                    >
                      <motion.div
                        key={activePlatform}
                        className="projects-showcase__device-wrapper"
                        custom={platformDirection}
                        initial={(direction) => ({
                          x: direction > 0 ? 160 : -160,
                          rotateY: direction > 0 ? 18 : -18,
                          opacity: 0,
                          scale: 0.96,
                        })}
                        animate={{ x: 0, rotateY: 0, opacity: 1, scale: 1 }}
                        exit={(direction) => ({
                          x: direction > 0 ? -160 : 160,
                          rotateY: direction > 0 ? -18 : 18,
                          opacity: 0,
                          scale: 0.96,
                        })}
                        transition={{
                          type: 'spring',
                          stiffness: 120,
                          damping: 24,
                          mass: 1,
                        }}
                      >
                        {activePlatform === 'mobile' ? (
                          <IPhone3DMockup
                            screenshot={activeProject.screenshot}
                            scrollProgress={scrollYProgress}
                          />
                        ) : (
                          <MacBook3DMockup
                            screenshot={activeProject.screenshot}
                            scrollProgress={scrollYProgress}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <button
                  type="button"
                  className="projects-showcase__control projects-showcase__control--side"
                  onClick={() => handleDirectionalStep(1)}
                  aria-label="Next project"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="projects-showcase__nav-row">
                <button
                  type="button"
                  className="projects-showcase__control"
                  onClick={() => handleDirectionalStep(-1)}
                  aria-label="Previous project"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className="projects-showcase__switch-link"
                >
                  View all
                </button>

                <button
                  type="button"
                  className="projects-showcase__control"
                  onClick={() => handleDirectionalStep(1)}
                  aria-label="Next project"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="projects-showcase__footer-action">
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className="projects-showcase__switch-link"
                >
                  View all
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
