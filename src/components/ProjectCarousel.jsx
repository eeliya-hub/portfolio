import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

const ProjectCarousel = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [isMagnified, setIsMagnified] = useState(false);

  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const closeLightbox = () => {
    setLightbox(false);
    setIsMagnified(false);
  };

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightbox(false);
        setIsMagnified(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  if (!images?.length) return null;

  const imageSizing = isMagnified
    ? {
        maxWidth: 'min(calc(100vw - 2rem), 1800px)',
        maxHeight: 'min(calc(100vh - 2rem), 1200px)',
      }
    : {
        maxWidth: 'min(calc(100vw - 4rem), 1440px)',
        maxHeight: 'min(calc(100vh - 4rem), 960px)',
      };

  const lightboxOverlay = lightbox && typeof document !== 'undefined'
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div className="absolute right-4 top-4 z-[210] flex items-center gap-2 sm:right-6 sm:top-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMagnified((value) => !value);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/18"
                aria-label={isMagnified ? 'Reduce image size' : 'Magnify image'}
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/18"
                aria-label="Close image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <motion.img
              key={`${images[activeIndex]}-${isMagnified ? 'magnified' : 'fit'}`}
              src={images[activeIndex]}
              alt={`${title} full ${activeIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-auto w-auto object-contain"
              style={imageSizing}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      <div className="space-y-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl glass">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`${title} preview ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="aspect-[16/10] w-full object-cover cursor-zoom-in"
            onClick={() => setLightbox(true)}
          />
        </AnimatePresence>

        {/* Arrow controls */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full glass text-gray-700 dark:text-white transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
          style={{ opacity: 0.8 }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full glass text-gray-700 dark:text-white transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
          style={{ opacity: 0.8 }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative p-1"
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-gradient-to-r from-indigo-500 to-purple-500'
                  : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-white/15 dark:hover:bg-white/25'
              }`}
            />
          </button>
        ))}
      </div>
      </div>
      {lightboxOverlay}
    </>
  );
};

export default ProjectCarousel;
