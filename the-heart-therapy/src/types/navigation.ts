export type NavigationType = 'about' | 'faq' | 'fees' | 'contact';

export interface NavigationItem {
  id: NavigationType;
  title: string;
  icon: string;
  description: string;
}
