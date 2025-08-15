export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
    accent: string;
  };
  spacing: Record<string, string>;
  typography: Record<string, string>;
}
