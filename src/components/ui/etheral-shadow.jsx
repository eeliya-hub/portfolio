'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { animate, useMotionValue } from 'motion/react';

const base = import.meta.env.BASE_URL;
const maskSrc = `${base}effects/etheral-mask.png`;
const noiseSrc = `${base}effects/etheral-noise.png`;

function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  if (fromLow === fromHigh) {
    return toLow;
  }

  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

function useInstanceId() {
  const id = useId();
  const cleanId = id.replace(/:/g, '');
  return `shadowoverlay-${cleanId}`;
}

export function Component({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className,
  title = 'Etheral Shadows',
  showTitle = true,
}) {
  const id = useInstanceId();
  const animationEnabled = animation && animation.scale > 0;
  const feColorMatrixRef = useRef(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef(null);
  const [performanceMode, setPerformanceMode] = useState('full');

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const updateMode = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      if (prefersReducedMotion || window.innerWidth < 560) {
        setPerformanceMode('reduced');
        return;
      }

      if (coarsePointer || window.innerWidth < 960) {
        setPerformanceMode('balanced');
        return;
      }

      setPerformanceMode('full');
    };

    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, []);

  const shouldAnimate = animationEnabled && performanceMode !== 'reduced';
  const balancedMode = performanceMode === 'balanced';

  const displacementScale = shouldAnimate
    ? mapRange(animation.scale, 1, 100, balancedMode ? 12 : 16, balancedMode ? 38 : 56)
    : 0;
  const animationDuration = shouldAnimate
    ? mapRange(animation.speed, 1, 100, balancedMode ? 3.8 : 2.8, balancedMode ? 1.45 : 0.95)
    : 1;

  useEffect(() => {
    if (feColorMatrixRef.current && shouldAnimate) {
      if (hueRotateAnimation.current) {
        hueRotateAnimation.current.stop();
      }

      hueRotateMotionValue.set(0);
      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        ease: 'linear',
        delay: 0,
        onUpdate: (value) => {
          if (feColorMatrixRef.current) {
            feColorMatrixRef.current.setAttribute('values', String(value));
          }
        },
      });

      return () => {
        if (hueRotateAnimation.current) {
          hueRotateAnimation.current.stop();
        }
      };
    }

    return undefined;
  }, [animationDuration, hueRotateMotionValue, shouldAnimate]);

  const noiseOpacity = noise?.opacity
    ? Math.min(
      performanceMode === 'reduced' ? 0.08 : balancedMode ? 0.18 : 0.3,
      noise.opacity / (balancedMode ? 2.8 : 2.1),
    )
    : 0;

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -displacementScale,
          filter: shouldAnimate ? `url(#${id}) blur(${balancedMode ? 1.5 : 2.25}px)` : 'none',
        }}
      >
        {shouldAnimate && (
          <svg style={{ position: 'absolute' }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves={balancedMode ? '1' : '2'}
                  baseFrequency={`${mapRange(
                    animation.scale,
                    0,
                    100,
                    balancedMode ? 0.00065 : 0.0008,
                    balancedMode ? 0.00042 : 0.00055,
                  )},${mapRange(animation.scale, 0, 100, balancedMode ? 0.0024 : 0.0029, balancedMode ? 0.00135 : 0.0018)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  ref={feColorMatrixRef}
                  in="undulation"
                  type="hueRotate"
                  values="180"
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('${maskSrc}')`,
            WebkitMaskImage: `url('${maskSrc}')`,
            maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
            WebkitMaskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {showTitle && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <h1 className="relative z-20 text-center text-6xl font-bold text-foreground md:text-7xl lg:text-8xl">
            {title}
          </h1>
        </div>
      )}

      {noiseOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${noiseSrc}")`,
            backgroundSize: (noise?.scale || 1) * 160,
            backgroundRepeat: 'repeat',
            opacity: noiseOpacity,
          }}
        />
      )}
    </div>
  );
}

export { Component as EtheralShadow };
