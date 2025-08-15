export const WINDOW_CONFIG = {
  DEFAULT_SIZE: {
    width: 600,
    height: 500,
  },
  MIN_SIZE: {
    width: 400,
    height: 300,
  },
  INITIAL_POSITION: {
    x: 100,
    y: 100,
  },
  OFFSET_INCREMENT: 30,
  MIN_Z_INDEX: 1000,
} as const;

export const TESTIMONIAL_CONFIG = {
  ROTATION_INTERVAL: 5000, // 5 seconds
  TRANSITION_DURATION: 500, // 0.5 seconds
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;
