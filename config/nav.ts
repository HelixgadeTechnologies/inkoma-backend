export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
}

export const marketingNav: NavItem[] = [
  { title: "Explore Tales", href: "/explore" },
  { title: "Personal Library", href: "/library" },
  { title: "Writer Studio", href: "/studio" },
  { title: "Support INKOMA", href: "/support" },
];

export const platformSidebarNav: NavItem[] = [
  { title: "Discover & Explore", href: "/explore", icon: "Compass" },
  { title: "My Library", href: "/library", icon: "BookOpen" },
  { title: "Writer Dashboard", href: "/studio", icon: "Feather", badge: "Studio" },
  { title: "My Storyteller Profile", href: "/profile/kwame_asante", icon: "User" },
  { title: "Account & Settings", href: "/settings", icon: "Sliders" },
  { title: "Support & FAQs", href: "/support", icon: "HelpCircle" },
];
