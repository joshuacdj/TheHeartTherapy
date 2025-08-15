export const WINDOW_CONFIG = {
  MIN_Z_INDEX: 1000,
  INITIAL_POSITION: { x: 100, y: 100 },
  OFFSET_INCREMENT: 30,
  DEFAULT_SIZE: { width: 500, height: 400 },
  HEADER_HEIGHT: 40,
} as const;

export const TESTIMONIAL_CONFIG = {
  ROTATION_INTERVAL: 5000,
  TRANSITION_DURATION: 500,
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;