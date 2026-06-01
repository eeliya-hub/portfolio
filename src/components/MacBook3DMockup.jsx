import { motion, useMotionValue, useMotionValueEvent, useSpring, useTime, useTransform } from 'motion/react';

function yawFromPointer(event, element, strength) {
  const rect = element.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;

  return px * strength;
}

export default function MacBook3DMockup({ screenshot, scrollProgress }) {
  const mouseYaw = useMotionValue(0);
  const scrollYaw = useMotionValue(-5);
  const scrollYOffset = useMotionValue(6);
  const time = useTime();
  const idleYaw = useTransform(time, (value) => Math.sin(value / 1850) * 3.6);
  const idleLift = useTransform(time, (value) => Math.sin(value / 1550) * 4.1);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    scrollYaw.set(-6 + latest * 12);
    scrollYOffset.set(6 - Math.sin(latest * Math.PI) * 6);
  });

  const rotateY = useSpring(
    useTransform(() => scrollYaw.get() + mouseYaw.get() + idleYaw.get()),
    { stiffness: 118, damping: 26, mass: 1.02 }
  );
  const translateY = useSpring(
    useTransform(() => scrollYOffset.get() + idleLift.get()),
    { stiffness: 108, damping: 24, mass: 1.06 }
  );

  return (
    <div
      className="projects-showcase__scene"
      onPointerMove={(event) => mouseYaw.set(yawFromPointer(event, event.currentTarget, 9))}
      onPointerLeave={() => mouseYaw.set(0)}
    >
      <motion.div
        className="projects-showcase__device monitor-mockup"
        style={{
          rotateX: 6,
          rotateY,
          y: translateY,
          transformPerspective: 2200,
        }}
      >
        <div className="monitor-mockup__rear-shell" />
        <div className="monitor-mockup__display">
          <div className="monitor-mockup__bezel">
            <div className="monitor-mockup__camera" />
            <img
              src={screenshot}
              alt=""
              width="1440"
              height="796"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable="false"
              className="monitor-mockup__screen"
            />
            <div className="monitor-mockup__screen-shadow" />
            <div className="monitor-mockup__glass" />
          </div>
          <div className="monitor-mockup__chin" />
        </div>
        <div className="monitor-mockup__arm-joint" />
        <div className="monitor-mockup__stem" />
        <div className="monitor-mockup__base" />
        <div className="monitor-mockup__foot-shadow" />
      </motion.div>
    </div>
  );
}
