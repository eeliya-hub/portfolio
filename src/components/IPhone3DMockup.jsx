import { motion, useMotionValue, useMotionValueEvent, useSpring, useTime, useTransform } from 'motion/react';

function yawFromPointer(event, element, strength) {
  const rect = element.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;

  return px * strength;
}

export default function IPhone3DMockup({ screenshot, scrollProgress }) {
  const mouseYaw = useMotionValue(0);
  const scrollYaw = useMotionValue(-6);
  const scrollYOffset = useMotionValue(10);
  const time = useTime();
  const idleYaw = useTransform(time, (value) => Math.sin(value / 1650) * 4.6);
  const idleLift = useTransform(time, (value) => Math.sin(value / 1450) * 5.25);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    scrollYaw.set(-7 + latest * 14);
    scrollYOffset.set(10 - Math.sin(latest * Math.PI) * 8);
  });

  const rotateY = useSpring(
    useTransform(() => scrollYaw.get() + mouseYaw.get() + idleYaw.get()),
    { stiffness: 120, damping: 26, mass: 1 }
  );
  const translateY = useSpring(
    useTransform(() => scrollYOffset.get() + idleLift.get()),
    { stiffness: 110, damping: 24, mass: 1.05 }
  );

  return (
    <div
      className="projects-showcase__scene"
      onPointerMove={(event) => mouseYaw.set(yawFromPointer(event, event.currentTarget, 12))}
      onPointerLeave={() => mouseYaw.set(0)}
    >
      <motion.div
        className="projects-showcase__device iphone-mockup"
        style={{
          rotateX: 9,
          rotateY,
          y: translateY,
          transformPerspective: 2200,
        }}
      >
        <div className="iphone-mockup__body">
          <div className="iphone-mockup__button iphone-mockup__button--power" />
          <div className="iphone-mockup__button iphone-mockup__button--volume-up" />
          <div className="iphone-mockup__button iphone-mockup__button--volume-down" />
          <div className="iphone-mockup__screen-shell">
            <div className="iphone-mockup__island">
              <div className="iphone-mockup__speaker" />
              <div className="iphone-mockup__camera" />
            </div>
            <img
              src={screenshot}
              alt=""
              width="720"
              height="1558"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable="false"
              className="iphone-mockup__screen"
            />
            <div className="iphone-mockup__screen-shadow" />
            <div className="iphone-mockup__glass" />
          </div>
          <div className="iphone-mockup__highlight" />
        </div>
      </motion.div>
    </div>
  );
}
